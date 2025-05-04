"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DropPointInfoFormProps {
    name: string
    description: string
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function DropPointInfoForm({ name, description, onNameChange, onDescriptionChange }: DropPointInfoFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">Drop Point Name</Label>
                <Input id="name" name="name" value={name} onChange={onNameChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" value={description} onChange={onDescriptionChange} />
            </div>
        </div>
    )
}
