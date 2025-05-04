"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { GeneralSettings } from "@/components/settings/general/general-settings"
import { AccountSettings } from "@/components/settings/account/account-settings"
import { StorageSettings } from "@/components/settings/storage/storage-settings"

export default function SettingsPage() {
  const { toast } = useToast()
  const [openingTime, setOpeningTime] = useState("09:00")
  const [closingTime, setClosingTime] = useState("18:00")

  // For ID card images
  const [idCardFrontPreview, setIdCardFrontPreview] = useState<string | null>(null)
  const [idCardBackPreview, setIdCardBackPreview] = useState<string | null>(null)

  // Mock drop point data
  const [dropPoint, setDropPoint] = useState({
    name: "Central Drop Point",
    description: "Centrally located drop point offering convenient package pickup and delivery services.",
    openingTime: "09:00",
    closingTime: "18:00",
    latitude: 35.6895,
    longitude: 139.6917,
    account: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      idCardFrontUrl: null,
      idCardBackUrl: null,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "State",
        zipCode: "12345",
      },
    },
    storage: {
      totalSlots: 50,
      availableSlots: 35,
      utilization: 0.3,
    },
  })

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated.`,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDropPoint((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDropPoint((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        [name]: value,
      },
    }))
  }

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDropPoint((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        address: {
          ...prev.account?.address,
          [name]: value,
        },
      },
    }))
  }

  const handleStorageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseInt(value, 10)

    setDropPoint((prev) => ({
      ...prev,
      storage: {
        ...prev.storage,
        [name]: numValue,
      },
    }))
  }

  const handleTimeChange = (field: string, value: string) => {
    setDropPoint((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === "openingTime") {
      setOpeningTime(value)
    } else if (field === "closingTime") {
      setClosingTime(value)
    }
  }

  const handleLocationChange = (lat: number, lng: number) => {
    setDropPoint((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
  }

  const handleIdCardFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setIdCardFrontPreview(imageUrl)

      // In a real app, you would upload the file to your server here
      toast({
        title: "ID Card Front Selected",
        description: "The front image of your ID card has been selected.",
      })
    }
  }

  const handleIdCardBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setIdCardBackPreview(imageUrl)

      // In a real app, you would upload the file to your server here
      toast({
        title: "ID Card Back Selected",
        description: "The back image of your ID card has been selected.",
      })
    }
  }

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <GeneralSettings
                dropPoint={dropPoint}
                onInputChange={handleInputChange}
                onTimeChange={handleTimeChange}
                onLocationChange={handleLocationChange}
                onSave={() => handleSave("general")}
            />
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <AccountSettings
                account={dropPoint.account}
                idCardFrontPreview={idCardFrontPreview}
                idCardBackPreview={idCardBackPreview}
                onAccountInputChange={handleAccountInputChange}
                onAddressInputChange={handleAddressInputChange}
                onIdCardFrontChange={handleIdCardFrontChange}
                onIdCardBackChange={handleIdCardBackChange}
                onSave={() => handleSave("account")}
            />
          </TabsContent>

          <TabsContent value="storage" className="space-y-6">
            <StorageSettings
                storage={dropPoint.storage}
                onStorageChange={handleStorageChange}
                onSave={() => handleSave("storage")}
            />
          </TabsContent>
        </Tabs>
      </div>
  )
}
