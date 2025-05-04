"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface StorageCapacityFormProps {
    totalSlots: number
    availableSlots: number
    utilization: number
    onTotalSlotsChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function StorageCapacityForm({
                                        totalSlots,
                                        availableSlots,
                                        utilization,
                                        onTotalSlotsChange,
                                    }: StorageCapacityFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="totalSlots">Total Slots</Label>
                <Input id="totalSlots" name="totalSlots" type="number" value={totalSlots} onChange={onTotalSlotsChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="availableSlots">Available Slots</Label>
                <Input id="availableSlots" name="availableSlots" type="number" value={availableSlots} disabled />
                <p className="text-xs text-muted-foreground">This is managed automatically by the system</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="utilization">Utilization</Label>
                <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
                    {`${(utilization * 100).toFixed(1)}%`}
                </div>
                <p className="text-xs text-muted-foreground">Current storage utilization</p>
            </div>
        </div>
    )
}
