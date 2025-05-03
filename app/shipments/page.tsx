"use client"

import { useState, useEffect } from "react"
import {Alert, Box, CircularProgress, Typography,Snackbar} from "@mui/material"
import { ShipmentStatus } from "@/types/shipment-types"
import ShipmentTable from "@/components/shipments/shipment-table"
import ShipmentFilter from "@/components/shipments/shipment-filter"
import ShipmentDetailsDialog from "@/components/shipments/shipment-details-dialog"
import CheckInDialog from "@/components/shipments/check-in-dialog"
import CheckOutDialog from "@/components/shipments/check-out-dialog"
import HistoryDialog from "@/components/shipments/history-dialog"
import { fetchMyOrders, fetchMyShipments } from "@/lib/api"

// Mock data for shipments
const mockShipments = [
  {
    id: 1,
    orderNumber: "ORD-001",
    ExternalOrderId: "12345678",
    label: "Order #12345",
    description: "Wireless Headphones and Phone Cases",
    totalAmount: 125.99,
    productCount: 3,
    customerName: "John Doe",
    status: ShipmentStatus.DELIVERING,
    checkInTime: null,
    checkOutTime: null,
    paymentMethod: "SHOPIFY",
    createdAt: "2023-06-15T10:30:00",
    arrivalPhoto: null,
    returnPhoto: null,
    ecomStore: {
      id: 2,
      description: "A modern online store for electronics.",
      imageUrl: "https://example.com/store-image.jpg",
      domainName: "techstore.com",
    },
    customer: {
      id: 3,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
    },
    shipment: {
      id: 1,
      status: ShipmentStatus.DELIVERING,
      verificationCode: "ada9e2ff-36c3-4ed7-8466-f02b4a30b3cb",
    },
    products: [
      { id: 1, name: "Wireless Headphones", price: 89.99, quantity: 1 },
      { id: 2, name: "Phone Case", price: 18.0, quantity: 2 },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    ExternalOrderId: "23456789",
    label: "Order #23456",
    description: "Smart Watch",
    totalAmount: 79.5,
    productCount: 1,
    customerName: "Jane Smith",
    status: ShipmentStatus.IN_STOCK,
    checkInTime: "2023-06-14T14:20:00",
    checkOutTime: null,
    paymentMethod: "COD",
    createdAt: "2023-06-14T09:15:00",
    arrivalPhoto: "/placeholder.svg?height=200&width=200",
    returnPhoto: null,
    ecomStore: {
      id: 2,
      description: "A modern online store for electronics.",
      imageUrl: "https://example.com/store-image.jpg",
      domainName: "techstore.com",
    },
    customer: {
      id: 4,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1987654321",
    },
    shipment: {
      id: 2,
      status: ShipmentStatus.IN_STOCK,
      verificationCode: "bda9e2ff-36c3-4ed7-8466-f02b4a30b3cb",
    },
    products: [{ id: 3, name: "Smart Watch", price: 79.5, quantity: 1 }],
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    ExternalOrderId: "34567890",
    label: "Order #34567",
    description: "Bluetooth Speaker and USB Cables",
    totalAmount: 199.99,
    productCount: 5,
    customerName: "Bob Johnson",
    status: ShipmentStatus.COLLECTED,
    checkInTime: "2023-06-13T11:45:00",
    checkOutTime: "2023-06-15T16:30:00",
    paymentMethod: "SHOPIFY",
    createdAt: "2023-06-13T08:20:00",
    arrivalPhoto: "/placeholder.svg?height=200&width=200",
    returnPhoto: null,
    ecomStore: {
      id: 3,
      description: "Home goods and accessories.",
      imageUrl: "https://example.com/store-image.jpg",
      domainName: "homestore.com",
    },
    customer: {
      id: 5,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1122334455",
    },
    shipment: {
      id: 3,
      status: ShipmentStatus.COLLECTED,
      verificationCode: "cda9e2ff-36c3-4ed7-8466-f02b4a30b3cb",
    },
    products: [
      { id: 4, name: "Bluetooth Speaker", price: 149.99, quantity: 1 },
      { id: 5, name: "USB Cable", price: 12.5, quantity: 4 },
    ],
  },
  {
    id: 4,
    orderNumber: "ORD-004",
    ExternalOrderId: "45678901",
    label: "Order #45678",
    description: "T-Shirts",
    totalAmount: 45.0,
    productCount: 2,
    customerName: "Alice Brown",
    status: ShipmentStatus.RETURN_INITIATED,
    checkInTime: "2023-06-12T09:30:00",
    checkOutTime: "2023-06-14T15:20:00",
    paymentMethod: "COD",
    createdAt: "2023-06-12T08:10:00",
    arrivalPhoto: "/placeholder.svg?height=200&width=200",
    returnPhoto: "/placeholder.svg?height=200&width=200",
    ecomStore: {
      id: 4,
      description: "Fashion and apparel store.",
      imageUrl: "https://example.com/store-image.jpg",
      domainName: "fashionstore.com",
    },
    customer: {
      id: 6,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "+1567890123",
    },
    shipment: {
      id: 4,
      status: ShipmentStatus.RETURN_INITIATED,
      verificationCode: "dda9e2ff-36c3-4ed7-8466-f02b4a30b3cb",
    },
    products: [{ id: 6, name: "T-Shirt", price: 22.5, quantity: 2 }],
  },
  {
    id: 5,
    orderNumber: "ORD-005",
    ExternalOrderId: "56789012",
    label: "Order #56789",
    description: "Laptop",
    totalAmount: 1299.99,
    productCount: 1,
    customerName: "David Wilson",
    status: ShipmentStatus.LOST,
    checkInTime: "2023-06-10T10:15:00",
    checkOutTime: null,
    paymentMethod: "SHOPIFY",
    createdAt: "2023-06-10T08:30:00",
    arrivalPhoto: "/placeholder.svg?height=200&width=200",
    returnPhoto: null,
    ecomStore: {
      id: 2,
      description: "A modern online store for electronics.",
      imageUrl: "https://example.com/store-image.jpg",
      domainName: "techstore.com",
    },
    customer: {
      id: 7,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1234567890",
    },
    shipment: {
      id: 5,
      status: ShipmentStatus.LOST,
      verificationCode: "eda9e2ff-36c3-4ed7-8466-f02b4a30b3cb",
    },
    products: [{ id: 7, name: "Laptop", price: 1299.99, quantity: 1 }],
  },
]

// Mock shipment history
const mockHistory = [
  {
    id: 1,
    shipmentId: 1,
    previousStatus: ShipmentStatus.PROCESSING,
    newStatus: ShipmentStatus.DELIVERING,
    changedBy: "system@example.com",
    changedAt: "2023-06-14T10:30:00",
    notes: "Shipment created and dispatched",
  },
  {
    id: 2,
    shipmentId: 1,
    previousStatus: ShipmentStatus.DELIVERING,
    newStatus: ShipmentStatus.IN_STOCK,
    changedBy: "droppoint@example.com",
    changedAt: "2023-06-15T14:20:00",
    notes: "Package received at drop point",
  },
]

export default function ShipmentsPage() {
  // const [shipments, setShipments] = useState(mockShipments)
  // const [filteredShipments, setFilteredShipments] = useState(mockShipments)
  const [selectedShipment, setSelectedShipment] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  const [shipments, setShipments] = useState<any[]>([])
  const [filteredShipments, setFilteredShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false)
  const [checkOutDialogOpen, setCheckOutDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleCheckInSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }
  const handleCheckOutSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [orders, shipments] = await Promise.all([
          fetchMyOrders(),
          fetchMyShipments()
        ])

        // Combine data even if one request fails (empty array)
        const combinedData = orders.map((order: any) => ({
          ...order,
          shipment: shipments.find((s: any) => s.orderId === order.id) || {
            status: 'UNKNOWN',
            verificationCode: 'N/A'
          },
          ExternalOrderId: order.shopifyOrderId,
          customerName: `Customer #${order.customer?.id || 'unknown'}`,
          checkInTime: shipments.find((s: any) => s.orderId === order.id)?.checkInDate,
          checkOutTime: shipments.find((s: any) => s.orderId === order.id)?.checkOutDate,
          paymentMethod: 'N/A' // Default value
        }))

        setShipments(combinedData)
        setFilteredShipments(combinedData)

        if (orders.length === 0 && shipments.length === 0) {
          setError('No shipment data found')
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

  // Filter shipments based on search term and status
  // useEffect(() => {
  //   let filtered = [...shipments]
  //
  //   if (searchTerm) {
  //     filtered = filtered.filter(
  //       (shipment) =>
  //         shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         shipment.ExternalOrderId.toLowerCase().includes(searchTerm.toLowerCase()),
  //     )
  //   }
  //
  //   if (statusFilter !== "ALL") {
  //     filtered = filtered.filter((shipment) => shipment.shipment.status === statusFilter)
  //   }
  //
  //   setFilteredShipments(filtered)
  // }, [shipments, searchTerm, statusFilter])

  useEffect(() => {
    let filtered = [...shipments]

    if (searchTerm) {
      filtered = filtered.filter(
          shipment =>
              shipment.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              shipment.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              shipment.ExternalOrderId?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
          shipment => shipment.shipment?.status === statusFilter
      )
    }

    setFilteredShipments(filtered)
  }, [shipments, searchTerm, statusFilter])


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

  // Handle view shipment details
  const handleViewShipment = (shipment: any) => {
    setSelectedShipment(shipment)
    setViewDialogOpen(true)
  }

  // Handle check-in process
  const handleCheckIn = (shipment: any) => {
    setSelectedShipment(shipment)
    setCheckInDialogOpen(true)
  }

  // Handle check-out process
  const handleCheckOut = (shipment: any) => {
    setSelectedShipment(shipment)
    setCheckOutDialogOpen(true)
  }

  // Handle view history
  const handleViewHistory = (shipment: any) => {
    setSelectedShipment(shipment)
    setHistoryDialogOpen(true)
  }

  // Submit check-in
  const handleCheckInSubmit = (file: File) => {
    if (!selectedShipment) return

    // In a real app, you would call the API
    // shipmentService.checkInShipment(selectedShipment.id, file)
    //   .then(response => {
    //     // Update shipment status
    //   })
    //   .catch(error => {
    //     console.error("Error checking in shipment:", error);
    //   });

    // For now, update the state directly
    const updatedShipments = shipments.map((shipment) => {
      if (shipment.id === selectedShipment.id) {
        return {
          ...shipment,
          shipment: {
            ...shipment.shipment,
            status: ShipmentStatus.IN_STOCK,
          },
          checkInTime: new Date().toISOString(),
          arrivalPhoto: URL.createObjectURL(file),
        }
      }
      return shipment
    })

    setShipments(updatedShipments)
    setCheckInDialogOpen(false)
  }

  // Submit check-out
  const handleCheckOutSubmit = (code: string) => {
    if (!selectedShipment) return

    // In a real app, you would call the API
    // shipmentService.checkOutShipment(selectedShipment.id, code)
    //   .then(response => {
    //     // Update shipment status
    //   })
    //   .catch(error => {
    //     console.error("Error checking out shipment:", error);
    //   });

    // For now, update the state directly
    const updatedShipments = shipments.map((shipment) => {
      if (shipment.id === selectedShipment.id) {
        return {
          ...shipment,
          shipment: {
            ...shipment.shipment,
            status: ShipmentStatus.COLLECTED,
          },
          checkOutTime: new Date().toISOString(),
        }
      }
      return shipment
    })

    setShipments(updatedShipments)
    setCheckOutDialogOpen(false)
  }

  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shipments
        </Typography>

        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
        )}

        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
        ) : (
            <>
              <ShipmentFilter
                  searchTerm={searchTerm}
                  statusFilter={statusFilter}
                  onSearchChange={setSearchTerm}
                  onStatusChange={setStatusFilter}
              />

              <ShipmentTable
                  shipments={filteredShipments}
                  onViewShipment={handleViewShipment}
                  onViewHistory={handleViewHistory}
                  onCheckIn={handleCheckIn}
                  onCheckOut={handleCheckOut}
              />

              <ShipmentDetailsDialog
                  open={viewDialogOpen}
                  shipment={selectedShipment}
                  onClose={() => setViewDialogOpen(false)}
              />

              <CheckInDialog
                  open={checkInDialogOpen}
                  shipment={selectedShipment}
                  onClose={() => setCheckInDialogOpen(false)}
                  onCheckInSuccess={handleCheckInSuccess}
              />

              <CheckOutDialog
                  open={checkOutDialogOpen}
                  shipment={selectedShipment}
                  onClose={() => setCheckOutDialogOpen(false)}
                  onCheckOutSuccess={handleCheckOutSuccess}
              />

              <HistoryDialog
                  open={historyDialogOpen}
                  shipment={selectedShipment}
                  onClose={() => setHistoryDialogOpen(false)}
              />
            </>
        )}
      </Box>
  )
}
