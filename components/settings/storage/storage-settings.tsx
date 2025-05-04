"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StorageCapacityForm } from "./storage-capacity-form"

interface StorageSettingsProps {
    storage: {
        totalSlots: number
        availableSlots: number
        utilization: number
    }
    onStorageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSave: () => void
}

export function StorageSettings({ storage, onStorageChange, onSave }: StorageSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Storage Information</CardTitle>
                <CardDescription>Manage your storage capacity</CardDescription>
            </CardHeader>
            <CardContent>
                <StorageCapacityForm
                    totalSlots={storage.totalSlots}
                    availableSlots={storage.availableSlots}
                    utilization={storage.utilization}
                    onTotalSlotsChange={onStorageChange}
                />
            </CardContent>
            <CardFooter>
                <Button onClick={onSave}>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}
