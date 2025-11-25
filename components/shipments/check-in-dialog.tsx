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
  LinearProgress,
} from "@mui/material"
import { CameraAlt as CameraIcon } from "@mui/icons-material"
import axios from "axios"

interface CheckInDialogProps {
  open: boolean
  shipment: any
  onClose: () => void
  onCheckInSuccess: () => void // Add this prop to refresh the list after success
}

const CheckInDialog: React.FC<CheckInDialogProps> = ({
                                                       open,
                                                       shipment,
                                                       onClose,
                                                       onCheckInSuccess
                                                     }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
      setError(null) // Clear any previous errors
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile || !shipment?.id) return

    setIsSubmitting(true)
    setError(null)

    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('photoType', 'ARRIVAL')

    try {
      const response = await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/api/shipments/${shipment.id}/check-in`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                )
                setUploadProgress(progress)
              }
            },
          }
      )

      if (response.status === 200) {
        onCheckInSuccess() // Refresh the parent component
        onClose() // Close the dialog
      }
    } catch (err) {
      console.error('Check-in failed:', err)
      setError('Failed to check in shipment. Please try again.')
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Check-In Package</DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            Upload a photo of the package to check it in.
          </DialogContentText>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Order: {shipment?.shopifyOrderId || shipment?.id}
            </Typography>
          </Box>

          <Box
              sx={{
                border: "1px dashed grey.300",
                p: 3,
                textAlign: "center",
                mb: 2,
              }}
          >
            <input
                accept="image/*"
                style={{ display: "none" }}
                id="check-in-photo-upload"
                type="file"
                onChange={handleFileChange}
                disabled={isSubmitting}
            />
            <label htmlFor="check-in-photo-upload">
              <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CameraIcon />}
                  disabled={isSubmitting}
              >
                Select Photo
              </Button>
            </label>

            {selectedFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {selectedFile.name}
                </Typography>
            )}
          </Box>

          {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
          )}

          {uploadProgress > 0 && (
              <Box sx={{ width: "100%", mb: 2 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="caption" align="center" display="block">
                  Uploading: {uploadProgress}%
                </Typography>
              </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
              onClick={handleSubmit}
              disabled={!selectedFile || isSubmitting}
              variant="contained"
              color="primary"
          >
            {isSubmitting ? 'Checking In...' : 'Check In'}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default CheckInDialog