"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Chip } from "@mui/material"
import { format } from "date-fns"
import StatusChip from "./status-chip"

interface HistoryDialogProps {
    open: boolean
    shipment: any
    onClose: () => void
}

const HistoryDialog: React.FC<HistoryDialogProps> = ({ open, shipment, onClose }) => {
    // Format date time
    const formatDateTime = (dateTimeString: string | null) => {
        if (!dateTimeString) return "N/A"
        try {
            return format(new Date(dateTimeString), "MMM dd, yyyy HH:mm")
        } catch (error) {
            return dateTimeString
        }
    }

    // Get the actual order ID from the shipment data
    const getOrderId = () => {
        if (!shipment) return 'N/A'
        // Prefer orderId from shipment object, fall back to id
        return shipment.shipment?.orderId || shipment.id || 'N/A'
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Shipment History</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Order ID: {getOrderId()}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Shopify Order ID: {shipment?.shopifyOrderId || 'N/A'}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Current Status: {shipment?.shipment?.status && <StatusChip status={shipment.shipment.status} />}
                    </Typography>
                </Box>

                {/* Rest of the component remains the same */}
                <Box sx={{ mt: 3 }}>
                    {shipment?.shipment?.statusHistory?.length ? (
                        shipment.shipment.statusHistory.map((item: any) => (
                            <Box
                                key={`${shipment.id}-${item.id}`}
                                sx={{
                                    position: "relative",
                                    pb: 3,
                                    pl: 3,
                                    borderLeft: "1px solid",
                                    borderColor: "grey.300",
                                    '&:last-child': {
                                        borderLeft: "none"
                                    }
                                }}
                            >
                                {/* Timeline item content remains the same */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: -4,
                                        top: 0,
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "primary.main",
                                    }}
                                />
                                <Box sx={{ mb: 1 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        {formatDateTime(item.updatedAt)}
                                    </Typography>
                                    <Typography variant="body1">
                                        Status changed from{" "}
                                        <Chip label={item.previousStatus.replace(/_/g, " ")} size="small" variant="outlined" /> to{" "}
                                        <Chip label={item.newStatus.replace(/_/g, " ")} size="small" variant="outlined" />
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Updated by: {item.changedByEmail || 'System'}
                                    </Typography>
                                    {item.note && (
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Note: {item.note}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No history available for this shipment
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default HistoryDialog