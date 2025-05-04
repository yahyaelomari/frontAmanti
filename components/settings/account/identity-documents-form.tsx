"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface IdentityDocumentsFormProps {
    idCardFrontPreview: string | null
    idCardBackPreview: string | null
    onIdCardFrontChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onIdCardBackChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function IdentityDocumentsForm({
                                          idCardFrontPreview,
                                          idCardBackPreview,
                                          onIdCardFrontChange,
                                          onIdCardBackChange,
                                      }: IdentityDocumentsFormProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="idCardFront">ID Card (Front)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Input id="idCardFront" name="idCardFront" type="file" accept="image/*" onChange={onIdCardFrontChange} />
                    </div>
                    <div className="h-32 border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {idCardFrontPreview ? (
                            <img
                                src={idCardFrontPreview || "/placeholder.svg"}
                                alt="ID Card Front"
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">No image uploaded</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="idCardBack">ID Card (Back)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Input id="idCardBack" name="idCardBack" type="file" accept="image/*" onChange={onIdCardBackChange} />
                    </div>
                    <div className="h-32 border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {idCardBackPreview ? (
                            <img
                                src={idCardBackPreview || "/placeholder.svg"}
                                alt="ID Card Back"
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">No image uploaded</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
