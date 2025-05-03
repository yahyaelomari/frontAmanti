// "use client"
//
// import type React from "react"
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from "@mui/material"
// import {
//   Visibility as VisibilityIcon,
//   CameraAlt as CameraIcon,
//   CheckCircle as CheckCircleIcon,
//   History as HistoryIcon,
// } from "@mui/icons-material"
// import { format } from "date-fns"
// import { ShipmentStatus } from "@/types/shipment-types"
// import StatusChip from "./status-chip"
//
// interface ShipmentTableProps {
//   shipments: any[]
//   onViewShipment: (shipment: any) => void
//   onViewHistory: (shipment: any) => void
//   onCheckIn: (shipment: any) => void
//   onCheckOut: (shipment: any) => void
// }
//
// const ShipmentTable: React.FC<ShipmentTableProps> = ({
//   shipments,
//   onViewShipment,
//   onViewHistory,
//   onCheckIn,
//   onCheckOut,
// }) => {
//   // Format date time
//   const formatDateTime = (dateTimeString: string | null) => {
//     if (!dateTimeString) return "N/A"
//     try {
//       return format(new Date(dateTimeString), "MMM dd, yyyy HH:mm")
//     } catch (error) {
//       return dateTimeString
//     }
//   }
//
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Order #</TableCell>
//             <TableCell>External ID</TableCell>
//             <TableCell>Customer</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Check-In</TableCell>
//             <TableCell>Check-Out</TableCell>
//             <TableCell>Total</TableCell>
//             <TableCell>Payment</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {shipments.length > 0 ? (
//             shipments.map((shipment) => (
//               <TableRow key={shipment.id}>
//                 <TableCell>{shipment.orderNumber}</TableCell>
//                 <TableCell>{shipment.ExternalOrderId}</TableCell>
//                 <TableCell>{shipment.customerName}</TableCell>
//                 <TableCell>
//                   <StatusChip status={shipment.shipment.status} />
//                 </TableCell>
//                 <TableCell>{formatDateTime(shipment.checkInTime)}</TableCell>
//                 <TableCell>{formatDateTime(shipment.checkOutTime)}</TableCell>
//                 <TableCell>${shipment.totalAmount.toFixed(2)}</TableCell>
//                 <TableCell>{shipment.paymentMethod}</TableCell>
//                 <TableCell>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <IconButton size="small" onClick={() => onViewShipment(shipment)}>
//                       <VisibilityIcon fontSize="small" />
//                     </IconButton>
//
//                     <IconButton size="small" onClick={() => onViewHistory(shipment)}>
//                       <HistoryIcon fontSize="small" />
//                     </IconButton>
//
//                     {shipment.shipment.status === ShipmentStatus.DELIVERING && (
//                       <IconButton size="small" onClick={() => onCheckIn(shipment)}>
//                         <CameraIcon fontSize="small" />
//                       </IconButton>
//                     )}
//
//                     {shipment.shipment.status === ShipmentStatus.IN_STOCK && (
//                       <IconButton size="small" onClick={() => onCheckOut(shipment)}>
//                         <CheckCircleIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={9} align="center">
//                 No shipments found
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }
//
// export default ShipmentTable

"use client"

import type React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from "@mui/material"
import {
  Visibility as VisibilityIcon,
  CameraAlt as CameraIcon,
  CheckCircle as CheckCircleIcon,
  History as HistoryIcon,
} from "@mui/icons-material"
import { format } from "date-fns"
import { ShipmentStatus } from "@/types/shipment-types"
import StatusChip from "./status-chip"

interface ShipmentTableProps {
  shipments: any[]
  onViewShipment: (shipment: any) => void
  onViewHistory: (shipment: any) => void
  onCheckIn: (shipment: any) => void
  onCheckOut: (shipment: any) => void
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({
                                                       shipments,
                                                       onViewShipment,
                                                       onViewHistory,
                                                       onCheckIn,
                                                       onCheckOut,
                                                     }) => {
  // Format date time
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
              <TableCell>Check-In</TableCell>
              <TableCell>Check-Out</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.length > 0 ? (
                shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      {/* Use order ID from API */}
                      <TableCell>{shipment.id}</TableCell>

                      {/* Map shopifyOrderId to External ID */}
                      <TableCell>{shipment.shopifyOrderId}</TableCell>

                      {/* Customer ID from API response */}
                      <TableCell>Customer #{shipment.customer?.id || 'N/A'}</TableCell>

                      {/* Status with fallback */}
                      <TableCell>
                        <StatusChip status={shipment.shipment?.status || ShipmentStatus.PROCESSING} />
                      </TableCell>

                      {/* Check-in/out dates from shipment data */}
                      <TableCell>{formatDateTime(shipment.shipment?.checkInDate)}</TableCell>
                      <TableCell>{formatDateTime(shipment.shipment?.checkOutDate)}</TableCell>

                      {/* Financial data */}
                      <TableCell>${shipment.totalAmount?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>{shipment.paymentMethod || 'N/A'}</TableCell>

                      {/* Actions with safety checks */}
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton size="small" onClick={() => onViewShipment(shipment)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>

                          <IconButton size="small" onClick={() => onViewHistory(shipment)}>
                            <HistoryIcon fontSize="small" />
                          </IconButton>

                          {shipment.shipment?.status === ShipmentStatus.DELIVERING && (
                              <IconButton size="small" onClick={() => onCheckIn(shipment)}>
                                <CameraIcon fontSize="small" />
                              </IconButton>
                          )}

                          {shipment.shipment?.status === ShipmentStatus.IN_STOCK && (
                              <IconButton size="small" onClick={() => onCheckOut(shipment)}>
                                <CheckCircleIcon fontSize="small" />
                              </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No shipments found
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default ShipmentTable