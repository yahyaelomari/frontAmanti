// payment-summary.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { UnpaidShipment } from "./unpaid-shipments-table"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface PaymentSummaryProps {
    shipments: UnpaidShipment[]
    checkoutUrl?: string
    onPaymentInitiated: () => void
}

export default function PaymentSummary({ shipments, checkoutUrl, onPaymentInitiated }: PaymentSummaryProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const subtotal = shipments.reduce((sum, shipment) => sum + shipment.totalAmount, 0)
    const feePerOrder = 2
    const totalFees = shipments.length * feePerOrder
    const total = subtotal - totalFees

    const handlePayNow = () => {
        if (!checkoutUrl) {
            setError("No checkout URL available")
            return
        }

        setLoading(true)
        onPaymentInitiated()
        window.location.href = checkoutUrl
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Review your payment details</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm">
                            Drop Point Fees ({shipments.length} orders × ${feePerOrder.toFixed(2)})
                        </span>
                        <span className="font-medium text-red-500">-${totalFees.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <span className="text-base font-semibold">Total</span>
                        <span className="text-lg font-bold">${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePayNow}
                    disabled={shipments.length === 0 || loading || !checkoutUrl}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Redirecting...
                        </div>
                    ) : "Pay Now"}
                </Button>
                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}
            </CardFooter>
        </Card>
    )
}