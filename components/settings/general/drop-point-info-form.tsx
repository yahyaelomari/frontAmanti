"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DropPointInfoFormProps {
    name: string
    description: string
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function DropPointInfoForm({
                                      name,
                                      description,
                                      onInputChange,
                                  }: DropPointInfoFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Drop Point Name</Label>
                <Input
                    name="name"
                    value={name}
                    onChange={onInputChange}
                />
            </div>
            <div className="space-y-2">
                <Label>Description</Label>
                <Input
                    name="description"
                    value={description}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}