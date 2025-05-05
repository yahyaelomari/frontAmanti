"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Payment = {
  id: number
  orderId: string
  customer: string
  amount: number
  method: string
  status: string
  date: string
}

export default function PendingPayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const { toast } = useToast()

  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Simulating API call
    const fetchPayments = async () => {
      // const response = await fetch('/api/payment/pending');
      // const data = await response.json();
      // setPayments(data);

      // Mock data
      setPayments([
        {
          id: 1,
          orderId: "ORD-002",
          customer: "Jane Smith",
          amount: 79.5,
          method: "COD",
          status: "PENDING",
          date: "2023-06-14",
        },
        {
          id: 2,
          orderId: "ORD-004",
          customer: "Alice Brown",
          amount: 45.0,
          method: "COD",
          status: "PENDING",
          date: "2023-06-12",
        },
        {
          id: 3,
          orderId: "ORD-007",
          customer: "David Lee",
          amount: 120.75,
          method: "COD",
          status: "PENDING",
          date: "2023-06-10",
        },
      ])
    }

    fetchPayments()
  }, [])

  const handleConfirmPayment = (paymentId: number) => {
    // In a real app, you would call your API to update the payment status
    toast({
      title: "Payment confirmed",
      description: "The payment has been marked as received",
    })

    // Update the local state to reflect the change
    setPayments(payments.filter((payment) => payment.id !== paymentId))
  }

  const handleReconcileAll = () => {
    // In a real app, you would call your API to reconcile all pending payment
    toast({
      title: "Payments reconciled",
      description: `${payments.length} payments have been reconciled`,
    })

    // Update the local state to reflect the change
    setPayments([])
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Pending COD Payments</h3>
        {payments.length > 0 && (
          <Button onClick={handleReconcileAll}>
            <DollarSign className="mr-2 h-4 w-4" />
            Reconcile All
          </Button>
        )}
      </div>

      {payments.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.orderId}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleConfirmPayment(payment.id)}>
                      Confirm Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-gray-500">No pending payments</p>
        </div>
      )}
    </div>
  )
}
