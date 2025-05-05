"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StorageCapacityFormProps {
    totalSlots: number
    availableSlots: number
    utilization: number
    onStorageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function StorageCapacityForm({
                                        totalSlots,
                                        availableSlots,
                                        utilization,
                                        onStorageChange,
                                    }: StorageCapacityFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>Total Slots</Label>
                <Input
                    name="totalSlots"
                    type="number"
                    value={totalSlots}
                    onChange={onStorageChange}
                    min="1"
                />
            </div>
            <div className="space-y-2">
                <Label>Available Slots</Label>
                <Input
                    name="availableSlots"
                    type="number"
                    value={availableSlots}
                    disabled
                />
                <p className="text-xs text-muted-foreground">
                    Automatically calculated
                </p>
            </div>
            <div className="space-y-2">
                <Label>Utilization</Label>
                <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
                    {utilization.toFixed(1)}%
                </div>
            </div>
        </div>
    )
}