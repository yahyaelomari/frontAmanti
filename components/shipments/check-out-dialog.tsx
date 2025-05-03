"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material"
import axios from "axios"

interface CheckOutDialogProps {
  open: boolean
  shipment: any
  onClose: () => void
  onCheckOutSuccess: () => void // Callback to refresh parent component
}

const CheckOutDialog: React.FC<CheckOutDialogProps> = ({
                                                         open,
                                                         shipment,
                                                         onClose,
                                                         onCheckOutSuccess,
                                                       }) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value)
    setError(null) // Clear errors when typing
  }

  const handleSubmit = async () => {
    if (!verificationCode || !shipment?.id) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await axios.patch(
          `http://localhost:8080/api/shipments/${shipment.id}/check-out`,
          null, // No body for PATCH request
          {
            params: {
              verificationCode: verificationCode
            }
          }
      )

      if (response.status === 200) {
        onCheckOutSuccess() // Refresh parent component
        onClose() // Close dialog
      }
    } catch (err) {
      console.error('Check-out failed:', err)
      setError(
          err.response?.data?.message ||
          'Failed to check out shipment. Please verify the code and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Collect Package</DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            Enter the verification code provided by the customer to complete the collection.
          </DialogContentText>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Order: {shipment?.shopifyOrderId || shipment?.id}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Customer: {shipment?.customerName || 'Unknown'}
            </Typography>
          </Box>

          <TextField
              label="Verification Code"
              fullWidth
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              margin="normal"
              disabled={isSubmitting}
              inputProps={{
                maxLength: 36, // UUID length
              }}
          />

          {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
              onClick={handleSubmit}
              disabled={!verificationCode || isSubmitting}
              variant="contained"
              color="primary"
          >
            {isSubmitting ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Verifying...
                </>
            ) : (
                'Complete Collection'
            )}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default CheckOutDialog