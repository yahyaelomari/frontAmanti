"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropPointInfoForm } from "./drop-point-info-form"
import { BusinessHoursForm } from "./business-hours-form"
import { LocationForm } from "./location-form"

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
                                    onSave,
                                }: GeneralSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Drop Point Information</CardTitle>
                <CardDescription>Manage your drop point details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <DropPointInfoForm
                    name={dropPoint.name}
                    description={dropPoint.description}
                    onNameChange={onInputChange}
                    onDescriptionChange={onInputChange}
                />

                <BusinessHoursForm
                    openingTime={dropPoint.openingTime}
                    closingTime={dropPoint.closingTime}
                    onOpeningTimeChange={(value) => onTimeChange("openingTime", value)}
                    onClosingTimeChange={(value) => onTimeChange("closingTime", value)}
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
