// page.tsx
"use client"

import { useState } from "react"
import UnpaidShipmentsTable from "@/components/payments/unpaid-shipments-table"
import PaymentSummary from "@/components/payments/payment-summary"
import { Alert } from "@/components/ui/alert"

export default function PaymentsPage() {
    const [shipments, setShipments] = useState<UnpaidShipment[]>([])
    const [checkoutData, setCheckoutData] = useState<{
        checkoutUrl: string
        orders: UnpaidShipment[]
    } | null>(null)
    const [globalError, setGlobalError] = useState<string | null>(null)

    const handleDataLoad = (loadedShipments: UnpaidShipment[], checkoutUrl?: string) => {
        setShipments(loadedShipments)
        if (checkoutUrl) {
            setCheckoutData({
                checkoutUrl,
                orders: loadedShipments
            })
        }
        setGlobalError(null)
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Collected Orders</h1>
                {globalError && (
                    <Alert variant="destructive" className="max-w-md">
                        {globalError}
                    </Alert>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <UnpaidShipmentsTable
                        onDataLoad={handleDataLoad}
                    />
                </div>
                <div>
                    <PaymentSummary
                        shipments={shipments}
                        checkoutUrl={checkoutData?.checkoutUrl}
                        onPaymentInitiated={() => setGlobalError(null)}
                    />
                </div>
            </div>
        </div>
    )
}