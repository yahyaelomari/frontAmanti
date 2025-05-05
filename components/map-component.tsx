"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

interface MapComponentProps {
    latitude: number
    longitude: number
    onLocationChange: (lat: number, lng: number) => void
}

export default function MapComponent({ latitude, longitude, onLocationChange }: MapComponentProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const markerRef = useRef<any>(null)

    useEffect(() => {
        // Dynamic import of Leaflet only on the client side
        const initializeMap = async () => {
            if (!mapRef.current) return

            // Dynamically import Leaflet
            const L = (await import("leaflet")).default

            // Use local marker icons from public folder
            const defaultIcon = L.icon({
                iconUrl: "/marker-icon.png",
                shadowUrl: "/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            })

            // Create map if it doesn't exist
            if (!mapInstanceRef.current) {
                mapInstanceRef.current = L.map(mapRef.current).setView([latitude || 35.6895, longitude || 139.6917], 13)

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(mapInstanceRef.current)

                // Add click handler to map
                mapInstanceRef.current.on("click", (e: any) => {
                    const { lat, lng } = e.latlng
                    onLocationChange(lat, lng)
                })
            }

            // Update marker position
            if (latitude && longitude) {
                const position = L.latLng(latitude, longitude)

                if (markerRef.current) {
                    markerRef.current.setLatLng(position)
                } else {
                    markerRef.current = L.marker(position, { icon: defaultIcon }).addTo(mapInstanceRef.current)
                }

                mapInstanceRef.current.setView(position, mapInstanceRef.current.getZoom())
            }
        }

        initializeMap()

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
                markerRef.current = null
            }
        }
    }, [latitude, longitude, onLocationChange])

    return <div ref={mapRef} className="h-[300px] rounded-md overflow-hidden border" />
}
