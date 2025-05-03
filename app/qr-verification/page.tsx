"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Camera, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ShipmentStatus } from "@/types/shipment-types"

export default function QrVerification() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean
    message: string
    orderDetails?: {
      id: string
      customer: string
      status: string
    }
  } | null>(null)
  const { toast } = useToast()

  const handleVerify = async () => {
    if (!verificationCode) {
      toast({
        title: "Verification failed",
        description: "Please enter a verification code",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would call your API to verify the code
    // const response = await fetch(`/api/verify-qr?code=${verificationCode}`);

    // Mock verification for demo purposes
    setTimeout(() => {
      if (verificationCode === "123456" || verificationCode === "GHI789") {
        setVerificationResult({
          success: true,
          message: "Verification successful",
          orderDetails: {
            id: "ORD-003",
            customer: "Bob Johnson",
            status: ShipmentStatus.IN_STOCK,
          },
        })
      } else {
        setVerificationResult({
          success: false,
          message: "Invalid verification code",
        })
      }
    }, 1000)
  }

  const handleScanQR = () => {
    setIsScanning(true)
    // In a real app, this would activate the device camera
    toast({
      title: "QR Scanner",
      description: "This would activate the camera in a real app",
    })

    // Mock scanning result
    setTimeout(() => {
      setIsScanning(false)
      setVerificationCode("GHI789")
    }, 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUploadPhoto = () => {
    if (!selectedFile) {
      toast({
        title: "Upload failed",
        description: "Please select a photo to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // In a real app, you would upload the photo to your server
    // const formData = new FormData();
    // formData.append('photo', selectedFile);
    // formData.append('orderId', verificationResult.orderDetails.id);
    // const response = await fetch('/api/shipments/upload-pickup-photo', {
    //   method: 'POST',
    //   body: formData
    // });

    // Mock upload for demo purposes
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Photo uploaded",
        description: "The pickup photo has been uploaded successfully",
      })

      // Reset the form
      setVerificationCode("")
      setSelectedFile(null)
      setVerificationResult(null)
    }, 2000)
  }

  const handleCompletePickup = () => {
    if (!verificationResult?.success) return

    // In a real app, you would call your API to update the shipment status
    // const response = await fetch(`/api/shipments/${verificationResult.orderDetails.id}/status`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: 'COLLECTED' })
    // });

    toast({
      title: "Pickup completed",
      description: `Order ${verificationResult.orderDetails?.id} has been marked as collected`,
    })

    // Reset the form
    setVerificationCode("")
    setSelectedFile(null)
    setVerificationResult(null)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">QR Verification</h1>

      <Card>
        <CardHeader>
          <CardTitle>Verify Order</CardTitle>
          <CardDescription>Scan the QR code or enter the verification code to verify an order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <Button variant="outline" onClick={handleScanQR} disabled={isScanning}>
                {isScanning ? "Scanning..." : <Camera className="h-4 w-4" />}
              </Button>
            </div>

            <Button onClick={handleVerify} className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Verify
            </Button>

            {verificationResult && (
              <div
                className={`p-4 rounded-md mt-4 ${
                  verificationResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <p className={`font-medium ${verificationResult.success ? "text-green-600" : "text-red-600"}`}>
                  {verificationResult.message}
                </p>

                {verificationResult.success && verificationResult.orderDetails && (
                  <div className="mt-4">
                    <h4 className="font-medium">Order Details</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="text-sm text-gray-500">Order ID:</p>
                      <p className="text-sm">{verificationResult.orderDetails.id}</p>
                      <p className="text-sm text-gray-500">Customer:</p>
                      <p className="text-sm">{verificationResult.orderDetails.customer}</p>
                      <p className="text-sm text-gray-500">Status:</p>
                      <p className="text-sm">{verificationResult.orderDetails.status}</p>
                    </div>

                    {verificationResult.orderDetails.status === ShipmentStatus.IN_STOCK && (
                      <div className="mt-4 space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                          <p className="text-sm font-medium mb-2">Upload Pickup Photo</p>
                          <Input type="file" accept="image/*" onChange={handleFileChange} />
                          {selectedFile && <p className="text-xs text-green-600 mt-2">Selected: {selectedFile.name}</p>}
                        </div>

                        <Button onClick={handleUploadPhoto} className="w-full" disabled={!selectedFile || isUploading}>
                          {isUploading ? (
                            "Uploading..."
                          ) : (
                            <>
                              <Camera className="mr-2 h-4 w-4" />
                              Upload Photo
                            </>
                          )}
                        </Button>

                        <Button onClick={handleCompletePickup} className="w-full" disabled={!selectedFile}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete Pickup
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
