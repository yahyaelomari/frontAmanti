"use client"

import type React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material"
import {
  Visibility as VisibilityIcon,
  CameraAlt as CameraIcon,
} from "@mui/icons-material"
import { format } from "date-fns"
import { ShipmentStatus } from "@/types/shipment-types"
import StatusChip from "./status-chip"

interface ReturnsTableProps {
  shipments: any[]
  onViewShipment: (shipment: any) => void
  onInitiateReturn: (shipment: any) => void
}

const ReturnsTable: React.FC<ReturnsTableProps> = ({
                                                     shipments,
                                                     onViewShipment,
                                                     onInitiateReturn,
                                                   }) => {
  const formatDateTime = (dateTimeString: string | null) => {
    if (!dateTimeString) return "N/A"
    try {
      return format(new Date(dateTimeString), "MMM dd, yyyy HH:mm")
    } catch (error) {
      return dateTimeString
    }
  }

  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>External ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Collection Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.length > 0 ? (
                shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell>{shipment.id}</TableCell>
                      <TableCell>{shipment.ExternalOrderId || 'N/A'}</TableCell>
                      <TableCell>{shipment.customerName || 'N/A'}</TableCell>
                      <TableCell>
                        <StatusChip status={shipment.shipment?.status || ShipmentStatus.PROCESSING} />
                      </TableCell>
                      <TableCell>{formatDateTime(shipment.collectionDate)}</TableCell>
                      <TableCell>${shipment.totalAmount?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>{shipment.paymentMethod || 'N/A'}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                              size="small"
                              onClick={() => onViewShipment(shipment)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>

                          {shipment.shipment?.status === ShipmentStatus.COLLECTED && (
                              <IconButton
                                  size="small"
                                  onClick={() => onInitiateReturn(shipment)}
                              >
                                <CameraIcon fontSize="small" />
                              </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No returnable shipments found
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default ReturnsTable