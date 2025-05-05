"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { DropPointInfoForm } from "./drop-point-info-form"
import { BusinessHoursForm } from "./business-hours-form"
import { LocationForm } from "./location-form"
import { Button } from "@/components/ui/button"

interface GeneralSettingsProps {
    dropPoint: {
        name: string
        description: string
        openingTime: string
        closingTime: string
        latitude: number
        longitude: number
    }
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTimeChange: (field: string, value: string) => void
    onLocationChange: (lat: number, lng: number) => void
    onSave: () => void
}

export function GeneralSettings({
                                    dropPoint,
                                    onInputChange,
                                    onTimeChange,
                                    onLocationChange,
                                    onSave
                                }: GeneralSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <DropPointInfoForm
                    name={dropPoint.name}
                    description={dropPoint.description}
                    onInputChange={onInputChange}
                />

                <BusinessHoursForm
                    openingTime={dropPoint.openingTime.split(':').slice(0, 2).join(':')}
                    closingTime={dropPoint.closingTime.split(':').slice(0, 2).join(':')}
                    onOpeningTimeChange={(v) => onTimeChange('openingTime', `${v}:00`)}
                    onClosingTimeChange={(v) => onTimeChange('closingTime', `${v}:00`)}
                />

                <LocationForm
                    latitude={dropPoint.latitude}
                    longitude={dropPoint.longitude}
                    onLocationChange={onLocationChange}
                />
            </CardContent>
            <CardFooter>
                <Button onClick={onSave}>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}