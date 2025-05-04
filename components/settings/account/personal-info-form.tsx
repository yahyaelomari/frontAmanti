"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface PersonalInfoFormProps {
    firstName: string
    lastName: string
    email: string
    phone: string
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PersonalInfoForm({ firstName, lastName, email, phone, onInputChange }: PersonalInfoFormProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={firstName} onChange={onInputChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={lastName} onChange={onInputChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={email} onChange={onInputChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={phone} onChange={onInputChange} />
            </div>
        </div>
    )
}
