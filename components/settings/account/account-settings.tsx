"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PersonalInfoForm } from "./personal-info-form"
import { IdentityDocumentsForm } from "./identity-documents-form"
import { AddressForm } from "./address-form"

interface AccountSettingsProps {
    account: {
        firstName: string
        lastName: string
        email: string
        phone: string
        address: {
            street: string
            city: string
            state: string
            zipCode: string
        }
    }
    idCardFrontPreview: string | null
    idCardBackPreview: string | null
    onAccountInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onAddressInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onIdCardFrontChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onIdCardBackChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSave: () => void
}

export function AccountSettings({
                                    account,
                                    idCardFrontPreview,
                                    idCardBackPreview,
                                    onAccountInputChange,
                                    onAddressInputChange,
                                    onIdCardFrontChange,
                                    onIdCardBackChange,
                                    onSave,
                                }: AccountSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <PersonalInfoForm
                    firstName={account.firstName}
                    lastName={account.lastName}
                    email={account.email}
                    phone={account.phone}
                    onInputChange={onAccountInputChange}
                />

                <Separator className="my-4" />
                <h3 className="text-sm font-medium mb-4">Identity Documents</h3>

                <IdentityDocumentsForm
                    idCardFrontPreview={idCardFrontPreview}
                    idCardBackPreview={idCardBackPreview}
                    onIdCardFrontChange={onIdCardFrontChange}
                    onIdCardBackChange={onIdCardBackChange}
                />

                <Separator className="my-4" />
                <h3 className="text-sm font-medium">Address</h3>

                <AddressForm
                    street={account.address.street}
                    city={account.address.city}
                    state={account.address.state}
                    zipCode={account.address.zipCode}
                    onInputChange={onAddressInputChange}
                />
            </CardContent>
            <CardFooter>
                <Button onClick={onSave}>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}
