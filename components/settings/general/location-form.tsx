"use client"

import { Label } from "@/components/ui/label"
import { LocationPicker } from "@/components/location-picker"

interface LocationFormProps {
    latitude: number
    longitude: number
    onLocationChange: (lat: number, lng: number) => void
}

export function LocationForm({ latitude, longitude, onLocationChange }: LocationFormProps) {
    return (
        <div className="space-y-2">
            <Label>Location</Label>
            <LocationPicker
                latitude={latitude}
                longitude={longitude}
                onLocationChange={onLocationChange}
            />
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <Label className="text-xs text-muted-foreground">
                        Latitude
                    </Label>
                    <div className="h-8 flex items-center px-3 border rounded-md bg-muted text-sm">
                        {latitude.toFixed(6)}
                    </div>
                </div>
                <div>
                    <Label className="text-xs text-muted-foreground">
                        Longitude
                    </Label>
                    <div className="h-8 flex items-center px-3 border rounded-md bg-muted text-sm">
                        {longitude.toFixed(6)}
                    </div>
                </div>
            </div>
        </div>
    )
}