"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface AddressFormProps {
    street: string
    city: string
    state: string
    zipCode: string
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AddressForm({ street, city, state, zipCode, onInputChange }: AddressFormProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input id="street" name="street" value={street} onChange={onInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={city} onChange={onInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={state} onChange={onInputChange} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" name="zipCode" value={zipCode} onChange={onInputChange} />
            </div>
        </div>
    )
}
