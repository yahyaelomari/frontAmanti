"use client"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"

// Dynamically import the map component with no SSR
const MapWithNoSSR = dynamic(() => import("./map-component"), {
    ssr: false,
    loading: () => (
        <div className="h-[300px] rounded-md overflow-hidden border flex items-center justify-center bg-muted">
            <p>Loading map...</p>
        </div>
    ),
})

interface LocationPickerProps {
    latitude: number
    longitude: number
    onLocationChange: (lat: number, lng: number) => void
}

export function LocationPicker({ latitude, longitude, onLocationChange }: LocationPickerProps) {
    const handleGetCurrentLocation = () => {
        if (typeof navigator !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    onLocationChange(latitude, longitude)
                },
                (error) => {
                    console.error("Error getting current location:", error)
                },
            )
        }
    }

    return (
        <div className="space-y-2">
            <MapWithNoSSR latitude={latitude} longitude={longitude} onLocationChange={onLocationChange} />
            <Button type="button" variant="outline" onClick={handleGetCurrentLocation} className="w-full">
                Get Current Location
            </Button>
            <p className="text-xs text-muted-foreground">
                Click on the map to set location or use the button above to use your current location
            </p>
        </div>
    )
}
