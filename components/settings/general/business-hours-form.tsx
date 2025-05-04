"use client"

import { Label } from "@/components/ui/label"
import { TimeInput } from "@/components/time-input"

interface BusinessHoursFormProps {
    openingTime: string
    closingTime: string
    onOpeningTimeChange: (value: string) => void
    onClosingTimeChange: (value: string) => void
}

export function BusinessHoursForm({
                                      openingTime,
                                      closingTime,
                                      onOpeningTimeChange,
                                      onClosingTimeChange,
                                  }: BusinessHoursFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="openingTime">Opening Time</Label>
                <TimeInput id="openingTime" value={openingTime} onChange={onOpeningTimeChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="closingTime">Closing Time</Label>
                <TimeInput id="closingTime" value={closingTime} onChange={onClosingTimeChange} />
            </div>
        </div>
    )
}
