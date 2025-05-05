"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PersonalInfoFormProps {
    firstName: string
    lastName: string
    email: string
    phone: string
    onAccountInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PersonalInfoForm({ firstName, lastName, email, phone, onAccountInputChange }: PersonalInfoFormProps) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={firstName} onChange={onAccountInputChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={lastName} onChange={onAccountInputChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={email} onChange={onAccountInputChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={phone} onChange={onAccountInputChange} />
            </div>
        </>
    )
}
