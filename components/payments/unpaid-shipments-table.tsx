// unpaid-shipments-table.tsx
"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createCheckoutSession } from "@/lib/api"

export type UnpaidShipment = {
    id: number
    shopifyOrderId: string
    label: string
    description: string
    totalAmount: number
    productCount: number
    isOrderPayed: boolean
    ecomStore: {
        id: number
        domainName: string
    }
    shipment: {
        status: string
    }
    dropPointId: number
}

interface UnpaidShipmentsTableProps {
    onDataLoad: (shipments: UnpaidShipment[], checkoutUrl?: string) => void
}

export default function UnpaidShipmentsTable({ onDataLoad }: UnpaidShipmentsTableProps) {
    const [shipments, setShipments] = useState<UnpaidShipment[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCollectedOrders = async () => {
        setLoading(true)
        try {
            const DEFAULT_DROP_POINT_ID = 1 // Replace with your actual drop point ID
            const response = await createCheckoutSession(DEFAULT_DROP_POINT_ID)

            if (response.success && response.data?.orders) {
                // Filter only collected AND unpaid orders
                const collectedUnpaidOrders = response.data.orders.filter(
                    order => order.shipment.status === "COLLECTED" && !order.isOrderPayed
                )

                setShipments(collectedUnpaidOrders)
                onDataLoad(collectedUnpaidOrders, response.data.checkoutUrl)
            }
        } catch (error) {
            console.error('Error fetching collected orders:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCollectedOrders()
    }, [onDataLoad])

    if (loading) {
        return <div className="rounded-md border p-4">Loading collected orders...</div>
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shipments.length > 0 ? (
                        shipments.map((shipment) => (
                            <TableRow key={shipment.id}>
                                <TableCell className="font-medium">{shipment.shopifyOrderId}</TableCell>
                                <TableCell>{shipment.ecomStore.domainName}</TableCell>
                                <TableCell>{shipment.description}</TableCell>
                                <TableCell>${shipment.totalAmount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No collected orders awaiting payment.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}