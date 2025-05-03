// app/returns/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Paper, TextField, InputAdornment, CircularProgress, Alert } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { ShipmentStatus } from "@/types/shipment-types"
import ReturnsTable from "@/components/returns/returns-table"
import ReturnDialog from "@/components/returns/return-dialog"
import SuccessDialog from "@/components/returns/success-dialog"
import ShipmentDetailsDialog from "@/components/shipments/shipment-details-dialog"
import { fetchMyOrders, fetchMyShipments } from "@/lib/api"

export default function ReturnsPage() {
  const [shipments, setShipments] = useState<any[]>([])
  const [filteredShipments, setFilteredShipments] = useState<any[]>([])
  const [selectedShipment, setSelectedShipment] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [returnDialogOpen, setReturnDialogOpen] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [orders, shipments] = await Promise.all([
          fetchMyOrders(),
          fetchMyShipments()
        ])

        // Combine and filter data
        const returnableStatuses = [
          ShipmentStatus.COLLECTED,
          ShipmentStatus.RETURN_INITIATED,
          ShipmentStatus.RETURN_COMPLETED,
          ShipmentStatus.LOST,
          ShipmentStatus.RETURN_REFUSED
        ]

        const combinedData = orders
            .map((order: any) => ({
              ...order,
              shipment: shipments.find((s: any) => s.orderId === order.id) || { status: 'UNKNOWN' },
              ExternalOrderId: order.shopifyOrderId,
              customerName: `Customer #${order.customer?.id || 'unknown'}`,
              collectionDate: shipments.find((s: any) => s.orderId === order.id)?.checkOutDate,
              paymentMethod: order.paymentMethod || 'N/A'
            }))
            .filter((item: any) => returnableStatuses.includes(item.shipment.status))

        setShipments(combinedData)
        setFilteredShipments(combinedData)

        if (combinedData.length === 0) {
          setError('No returnable shipments found')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to load data. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey])

  useEffect(() => {
    const filtered = shipments.filter(shipment =>
        shipment.ExternalOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredShipments(filtered)
  }, [searchTerm, shipments])

    const handleInitiateReturn = async (file: File, reason: string) => {
        if (!selectedShipment) return

        try {
            const formData = new FormData()
            formData.append('photo', file)
            formData.append('reason', reason)

            const response = await fetch(`http://localhost:8080/api/shipments/${selectedShipment.id}/initiate-return`, {
                method: 'PATCH',
                body: formData
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Return initiation failed')
            }

            setRefreshKey(prev => prev + 1)
            setReturnDialogOpen(false)
            setSuccessDialogOpen(true)
        } catch (err) {
            console.error('Return initiation failed:', err)
            setError(err.message || 'Failed to initiate return. Please try again.')
        }
    }

  if (loading) {
    return (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
    )
  }

  if (error) {
    return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
    )
  }

  return (
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
          Returns Management
        </Typography>

        <Paper elevation={2} sx={{ mb: 4, p: 3 }}>
          <TextField
              fullWidth
              placeholder="Search by order number or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
              sx={{ mb: 2 }}
          />

          <ReturnsTable
              shipments={filteredShipments}
              onViewShipment={(shipment) => {
                setSelectedShipment(shipment)
                setViewDialogOpen(true)
              }}
              onInitiateReturn={(shipment) => {
                setSelectedShipment(shipment)
                setReturnDialogOpen(true)
              }}
          />
        </Paper>

        {/* Dialogs */}
        <ShipmentDetailsDialog
            open={viewDialogOpen}
            shipment={selectedShipment}
            onClose={() => setViewDialogOpen(false)}
        />

        <ReturnDialog
            open={returnDialogOpen}
            shipment={selectedShipment}
            onClose={() => setReturnDialogOpen(false)}
            onSubmit={handleInitiateReturn}
        />

        <SuccessDialog
            open={successDialogOpen}
            shipment={selectedShipment}
            onClose={() => setSuccessDialogOpen(false)}
        />
      </Box>
  )
}