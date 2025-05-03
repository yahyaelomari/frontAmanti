"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Camera, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ShipmentStatus } from "@/types/shipment-types"

type Order = {
  id: number
  label: string
  customer: string
  status: string
  amount: number
  date: string
  paymentMethod: string
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Simulating API call
    const fetchOrders = async () => {
      // const response = await fetch('/api/orders/recent');
      // const data = await response.json();
      // setOrders(data);

      // Mock data
      setOrders([
        {
          id: 1,
          label: "ORD-001",
          customer: "John Doe",
          status: "PROCESSING",
          amount: 125.99,
          date: "2023-06-15",
          paymentMethod: "SHOPIFY",
        },
        {
          id: 2,
          label: "ORD-002",
          customer: "Jane Smith",
          status: "DELIVERING",
          amount: 79.5,
          date: "2023-06-14",
          paymentMethod: "COD",
        },
        {
          id: 3,
          label: "ORD-003",
          customer: "Bob Johnson",
          status: "IN_STOCK",
          amount: 199.99,
          date: "2023-06-13",
          paymentMethod: "SHOPIFY",
        },
        {
          id: 4,
          label: "ORD-004",
          customer: "Alice Brown",
          status: "READY_FOR_PICKUP",
          amount: 45.0,
          date: "2023-06-12",
          paymentMethod: "COD",
        },
        {
          id: 5,
          label: "ORD-005",
          customer: "Charlie Wilson",
          status: "COLLECTED",
          amount: 67.25,
          date: "2023-06-11",
          paymentMethod: "SHOPIFY",
        },
      ])
    }

    fetchOrders()
  }, [])

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleUploadPhoto = (orderId: number) => {
    // In a real app, you would open a file picker and upload the photo
    toast({
      title: "Photo upload",
      description: "This would open a photo upload dialog in the real app",
    })
  }

  const handleMarkAsReceived = (orderId: number) => {
    // In a real app, you would call your API to update the order status
    toast({
      title: "Status updated",
      description: "Order marked as received",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case ShipmentStatus.PROCESSING:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Processing
          </Badge>
        )
      case ShipmentStatus.DELIVERING:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            Delivering
          </Badge>
        )
      case ShipmentStatus.IN_STOCK:
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            In Stock
          </Badge>
        )
      case ShipmentStatus.READY_FOR_PICKUP:
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Ready for Pickup
          </Badge>
        )
      case ShipmentStatus.COLLECTED:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Collected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.label}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {order.status === "DELIVERING" && (
                      <Button variant="ghost" size="icon" onClick={() => handleUploadPhoto(order.id)}>
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                    {order.status === "DELIVERING" && (
                      <Button variant="ghost" size="icon" onClick={() => handleMarkAsReceived(order.id)}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order ID</p>
                  <p>{selectedOrder.label}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedOrder.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p>${selectedOrder.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{selectedOrder.date}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500 mb-2">Actions</p>
                <div className="flex space-x-2">
                  {selectedOrder.status === "DELIVERING" && (
                    <Button onClick={() => handleUploadPhoto(selectedOrder.id)}>
                      <Camera className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  )}
                  {selectedOrder.status === "DELIVERING" && (
                    <Button onClick={() => handleMarkAsReceived(selectedOrder.id)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Received
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
