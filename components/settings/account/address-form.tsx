"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface AddressFormProps {
    address: {
        street: string
        city: string
        state: string
        zipCode: string
    }
    onAddressInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AddressForm({ address, onAddressInputChange }: AddressFormProps) {
    return (
        <>
            <Separator className="my-4" />
            <h3 className="text-sm font-medium">Address</h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Street</Label>
                    <Input
                        name="street"
                        value={address.street}
                        onChange={onAddressInputChange}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                            name="city"
                            value={address.city}
                            onChange={onAddressInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>State</Label>
                        <Input
                            name="state"
                            value={address.state}
                            onChange={onAddressInputChange}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Zip Code</Label>
                    <Input
                        name="zipCode"
                        value={address.zipCode}
                        onChange={onAddressInputChange}
                    />
                </div>
            </div>
        </>
    )
}