"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { StorageCapacityForm } from "./storage-capacity-form"
import { Button } from "@/components/ui/button"

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
                <CardTitle>Storage Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <StorageCapacityForm
                    totalSlots={storage.totalSlots}
                    availableSlots={storage.availableSlots}
                    utilization={storage.utilization}
                    onStorageChange={onStorageChange}
                />
            </CardContent>
            <CardFooter>
                <Button onClick={onSave}>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}