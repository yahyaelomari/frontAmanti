"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Camera, CheckCircle, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Order = {
  id: number
  label: string
  customer: string
  status: string
  amount: number
  date: string
  paymentMethod: string
  ecomStore: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const { toast } = useToast()

  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Simulating API call
    const fetchOrders = async () => {
      // const response = await fetch('/api/orders');
      // const data = await response.json();
      // setOrders(data);

      // Mock data
      const mockOrders = [
        {
          id: 1,
          label: "ORD-001",
          customer: "John Doe",
          status: "PROCESSING",
          amount: 125.99,
          date: "2023-06-15",
          paymentMethod: "SHOPIFY",
          ecomStore: "Fashion Store",
        },
        {
          id: 2,
          label: "ORD-002",
          customer: "Jane Smith",
          status: "DELIVERING",
          amount: 79.5,
          date: "2023-06-14",
          paymentMethod: "COD",
          ecomStore: "Electronics Hub",
        },
        {
          id: 3,
          label: "ORD-003",
          customer: "Bob Johnson",
          status: "IN_STOCK",
          amount: 199.99,
          date: "2023-06-13",
          paymentMethod: "SHOPIFY",
          ecomStore: "Home Goods",
        },
        {
          id: 4,
          label: "ORD-004",
          customer: "Alice Brown",
          status: "READY_FOR_PICKUP",
          amount: 45.0,
          date: "2023-06-12",
          paymentMethod: "COD",
          ecomStore: "Fashion Store",
        },
        {
          id: 5,
          label: "ORD-005",
          customer: "Charlie Wilson",
          status: "COLLECTED",
          amount: 67.25,
          date: "2023-06-11",
          paymentMethod: "SHOPIFY",
          ecomStore: "Electronics Hub",
        },
      ]
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    let result = orders

    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(result)
  }, [searchTerm, statusFilter, orders])

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

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    // In a real app, you would call your API to update the order status
    toast({
      title: "Status updated",
      description: `Order status updated to ${newStatus}`,
    })

    // Update the local state to reflect the change
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PROCESSING":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Processing
          </Badge>
        )
      case "DELIVERING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            Delivering
          </Badge>
        )
      case "IN_STOCK":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            In Stock
          </Badge>
        )
      case "READY_FOR_PICKUP":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Ready for Pickup
          </Badge>
        )
      case "COLLECTED":
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
          <CardDescription>Search and filter orders by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by order ID or customer"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="DELIVERING">Delivering</SelectItem>
                  <SelectItem value="IN_STOCK">In Stock</SelectItem>
                  <SelectItem value="READY_FOR_PICKUP">Ready for Pickup</SelectItem>
                  <SelectItem value="COLLECTED">Collected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Ecom Store</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.label}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.ecomStore}</TableCell>
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
                        <Button variant="ghost" size="icon" onClick={() => handleUpdateStatus(order.id, "IN_STOCK")}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            )}
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
                <div>
                  <p className="text-sm font-medium text-gray-500">Ecom Store</p>
                  <p>{selectedOrder.ecomStore}</p>
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
                    <Button
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, "IN_STOCK")
                        setIsDialogOpen(false)
                      }}
                    >
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
    </div>
  )
}
