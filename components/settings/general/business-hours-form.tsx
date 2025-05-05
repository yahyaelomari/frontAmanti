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

    const formatTimeForBackend = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Opening Time</Label>
                <TimeInput
                    value={openingTime.split(':').slice(0, 2).join(':')}
                    onChange={v => onOpeningTimeChange(formatTimeForBackend(v))}
                />
            </div>
            <div className="space-y-2">
                <Label>Closing Time</Label>
                {/* Fixed value and onChange below */}
                <TimeInput
                    value={closingTime.split(':').slice(0, 2).join(':')}
                    onChange={v => onClosingTimeChange(formatTimeForBackend(v))}
                />
            </div>
        </div>
    )
}