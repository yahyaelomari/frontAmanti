"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

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
        <>
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4">Identity Documents</h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>ID Card (Front)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={onIdCardFrontChange}
                        />
                        <div className="h-32 border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            {idCardFrontPreview ? (
                                <img
                                    src={idCardFrontPreview}
                                    alt="ID Front"
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">No image uploaded</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>ID Card (Back)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={onIdCardBackChange}
                        />
                        <div className="h-32 border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            {idCardBackPreview ? (
                                <img
                                    src={idCardBackPreview}
                                    alt="ID Back"
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">No image uploaded</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}