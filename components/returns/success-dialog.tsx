"use client"

import type React from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material"

interface SuccessDialogProps {
  open: boolean
  shipment: any
  onClose: () => void
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, shipment, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CheckCircleIcon color="success" />
        Return Initiated Successfully
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          The return for order {shipment?.ExternalOrderId} has been successfully initiated. The store owner will be
          notified.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessDialog
