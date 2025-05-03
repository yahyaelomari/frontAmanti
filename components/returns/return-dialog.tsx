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
  Grid,
  Divider,
  LinearProgress,
  Alert,
} from "@mui/material"
import { CameraAlt as CameraIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material"

interface ReturnDialogProps {
  open: boolean
  shipment: any
  onClose: () => void
  onSubmit: (file: File, reason: string) => Promise<void>
}

const ReturnDialog: React.FC<ReturnDialogProps> = ({ open, shipment, onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [returnReason, setReturnReason] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile || !returnReason || !shipment) {
      setError('Please provide both a photo and reason')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      await onSubmit(selectedFile, returnReason)
      // Reset form on success
      setSelectedFile(null)
      setReturnReason("")
    } catch (err) {
      setError('Failed to initiate return. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
      <Dialog open={open} onClose={() => !isUploading && onClose()} maxWidth="sm" fullWidth>
        <DialogTitle>Initiate Return</DialogTitle>
        <DialogContent dividers>
          <DialogContentText paragraph>
            Upload a photo of the returned item and provide a reason for the return.
          </DialogContentText>

          {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Order
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {shipment?.ExternalOrderId || shipment?.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Customer
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {shipment?.customerName || 'Unknown'}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
              sx={{
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 1,
                p: 3,
                textAlign: "center",
                mb: 3,
                bgcolor: "action.hover",
              }}
          >
            <input
                accept="image/*"
                style={{ display: "none" }}
                id="return-photo-upload"
                type="file"
                onChange={handleFileChange}
                disabled={isUploading}
                capture="environment" // For mobile camera capture
            />
            <label htmlFor="return-photo-upload">
              <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  disabled={isUploading}
                  sx={{ mb: 2 }}
              >
                Select Photo
              </Button>
            </label>

            {selectedFile && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Selected: {selectedFile.name}
                  </Typography>
                  <Box
                      sx={{
                        width: "100%",
                        height: 150,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: 'hidden'
                      }}
                  >
                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Return item preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                    />
                  </Box>
                </Box>
            )}
          </Box>

          <TextField
              label="Return Reason"
              multiline
              rows={4}
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Explain why this item is being returned..."
              helperText={`${returnReason.length}/150 characters`}
              inputProps={{ maxLength: 150 }}
              disabled={isUploading}
              required
          />

          {isUploading && (
              <Box sx={{ width: "100%", mt: 2 }}>
                <LinearProgress />
                <Typography variant="caption" display="block" textAlign="center" mt={1}>
                  Processing return...
                </Typography>
              </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
              onClick={handleSubmit}
              disabled={!selectedFile || !returnReason || isUploading}
              variant="contained"
              color="secondary"
              startIcon={<CameraIcon />}
          >
            Initiate Return
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default ReturnDialog