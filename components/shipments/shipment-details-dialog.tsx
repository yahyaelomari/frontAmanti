"use client"

import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Tabs, Tab,
    Grid, Card, CardHeader, CardContent, Typography, TableContainer, Table,
    TableHead, TableRow, TableCell, TableBody, Stack
} from "@mui/material"
import { format } from "date-fns"
import StatusChip from "./status-chip"
import { ShipmentStatus } from "@/types/shipment-types"
import {useState} from "react";

interface ShipmentDetailsDialogProps {
    open: boolean
    shipment: any
    onClose: () => void
}

const ShipmentDetailsDialog: React.FC<ShipmentDetailsDialogProps> = ({ open, shipment, onClose }) => {
    const [currentTab, setCurrentTab] = useState(0)

    const formatDateTime = (dateTimeString: string | null) => {
        if (!dateTimeString) return "Not available"
        try {
            return format(new Date(dateTimeString), "PPpp") // More readable format
        } catch (error) {
            return dateTimeString
        }
    }

    const shouldShowVerificationCode = () => {
        const status = shipment?.shipment?.status
        return !(status === ShipmentStatus.PROCESSING || status === ShipmentStatus.DELIVERING)
    }

    const getImageUrl = (path: string | null) => {
        if (!path) return null
        // Handle both full URLs and relative paths
        if (path.startsWith('http')) return path
        // Remove leading './' if present
        const cleanPath = path.startsWith('./') ? path.substring(2) : path
        return `${process.env.REACT_APP_BACKEND_URL}/${cleanPath}`
    }

    if (!shipment) return null

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Shipment Details - {shipment.shopifyOrderId || `Order #${shipment.id}`}
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ mb: 2 }}>
                        <Tab label="Details" />
                        <Tab label="Products" />
                        <Tab label="History" />
                    </Tabs>

                    {/* Details Tab */}
                    {currentTab === 0 && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardHeader title="Shipping Information" />
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">Status</Typography>
                                                <StatusChip status={shipment.shipment?.status} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">Order ID</Typography>
                                                <Typography>{shipment.id}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">Shopify Order ID</Typography>
                                                <Typography>{shipment.shopifyOrderId}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">Created At</Typography>
                                                <Typography>{formatDateTime(shipment.createdAt)}</Typography>
                                            </Box>
                                            {shouldShowVerificationCode() && (
                                                <Box>
                                                    <Typography variant="body2" color="textSecondary">Verification Code</Typography>
                                                    <Typography sx={{ fontFamily: 'monospace' }}>
                                                        {shipment.shipment?.verificationCode || 'Not available'}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardHeader title="Timeline" />
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">Check-In</Typography>
                                                <Typography>
                                                    {shipment.shipment?.checkInDate ?
                                                        formatDateTime(shipment.shipment.checkInDate) : 'Not checked in'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="textSecondary">Check-Out</Typography>
                                                <Typography>
                                                    {shipment.shipment?.checkOutDate ?
                                                        formatDateTime(shipment.shipment.checkOutDate) : 'Not collected'}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>

                                <Card variant="outlined" sx={{ mt: 3 }}>
                                    <CardHeader title="Photos" />
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">Arrival Photo</Typography>
                                                {getImageUrl(shipment.shipment?.arrivalPhotoPath) ? (
                                                    <Box sx={{
                                                        width: '100%',
                                                        height: 200,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        overflow: 'hidden',
                                                        border: '1px solid #eee',
                                                        borderRadius: 1
                                                    }}>
                                                        <img
                                                            src={getImageUrl(shipment.shipment.arrivalPhotoPath)}
                                                            alt="Arrival"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '100%',
                                                                objectFit: 'contain'
                                                            }}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none'
                                                            }}
                                                        />
                                                    </Box>
                                                ) : (
                                                    <Typography variant="body2" color="textSecondary">
                                                        No photo available
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">Return Photo</Typography>
                                                {getImageUrl(shipment.shipment?.returnPhotoPath) ? (
                                                    <Box sx={{
                                                        width: '100%',
                                                        height: 200,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        overflow: 'hidden',
                                                        border: '1px solid #eee',
                                                        borderRadius: 1
                                                    }}>
                                                        <img
                                                            src={getImageUrl(shipment.shipment.returnPhotoPath)}
                                                            alt="Return"
                                                            style={{
                                                                maxWidth: '100%',
                                                                maxHeight: '100%',
                                                                objectFit: 'contain'
                                                            }}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none'
                                                            }}
                                                        />
                                                    </Box>
                                                ) : (
                                                    <Typography variant="body2" color="textSecondary">
                                                        No photo available
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}

                    {/* Products Tab - Remains the same as before */}
                    {currentTab === 1 && (
                        <Card variant="outlined">
                            <CardHeader title="Order Contents" />
                            <CardContent>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Description</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{shipment.description || 'No description available'}</TableCell>
                                                <TableCell align="right">{shipment.productCount || 0}</TableCell>
                                                <TableCell align="right">${shipment.totalAmount?.toFixed(2) || '0.00'}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    )}

                    {/* History Tab - Remains the same as before */}
                    {currentTab === 2 && (
                        <Card variant="outlined">
                            <CardHeader title="Status History" />
                            <CardContent>
                                {shipment.shipment?.statusHistory?.length > 0 ? (
                                    <Stack spacing={2}>
                                        {shipment.shipment.statusHistory.map((history: any) => (
                                            <Box key={history.id} sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {formatDateTime(history.updatedAt)}
                                                </Typography>
                                                <Typography>
                                                    Changed from <StatusChip status={history.previousStatus} size="small" /> to{' '}
                                                    <StatusChip status={history.newStatus} size="small" />
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    By: {history.changedByEmail || 'System'}
                                                </Typography>
                                                {history.note && (
                                                    <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                                                        Note: {history.note}
                                                    </Typography>
                                                )}
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant="body2" color="textSecondary">
                                        No status history available
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShipmentDetailsDialog