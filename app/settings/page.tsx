"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TimeInput } from "@/components/time-input"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [openingTime, setOpeningTime] = useState("09:00")
  const [closingTime, setClosingTime] = useState("18:00")

  // Mock drop point data
  const [dropPoint, setDropPoint] = useState({
    name: "Central Drop Point",
    description: "Centrally located drop point offering convenient package pickup and delivery services.",
    openingTime: "09:00",
    closingTime: "18:00",
    latitude: 35.6895,
    longitude: 139.6917,
    dropPointFees: 5.0,
    account: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
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
          <Card>
            <CardHeader>
              <CardTitle>Drop Point Information</CardTitle>
              <CardDescription>Manage your drop point details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Drop Point Name</Label>
                  <Input id="name" name="name" value={dropPoint.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={dropPoint.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <TimeInput id="openingTime" value={openingTime} onChange={setOpeningTime} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <TimeInput id="closingTime" value={closingTime} onChange={setClosingTime} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="0.000001"
                    value={dropPoint.latitude}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="0.000001"
                    value={dropPoint.longitude}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropPointFees">Drop Point Fees</Label>
                <Input
                  id="dropPointFees"
                  name="dropPointFees"
                  type="number"
                  step="0.01"
                  value={dropPoint.dropPointFees}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("general")}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={dropPoint.account.firstName}
                  onChange={handleAccountInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={dropPoint.account.lastName}
                  onChange={handleAccountInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={dropPoint.account.email}
                  onChange={handleAccountInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={dropPoint.account.phone} onChange={handleAccountInputChange} />
              </div>

              <Separator className="my-4" />
              <h3 className="text-sm font-medium">Address</h3>

              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  name="street"
                  value={dropPoint.account.address.street}
                  onChange={handleAddressInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={dropPoint.account.address.city}
                    onChange={handleAddressInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={dropPoint.account.address.state}
                    onChange={handleAddressInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={dropPoint.account.address.zipCode}
                  onChange={handleAddressInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("account")}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Information</CardTitle>
              <CardDescription>Manage your storage capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalSlots">Total Slots</Label>
                  <Input
                    id="totalSlots"
                    name="totalSlots"
                    type="number"
                    value={dropPoint.storage.totalSlots}
                    onChange={handleStorageChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableSlots">Available Slots</Label>
                  <Input
                    id="availableSlots"
                    name="availableSlots"
                    type="number"
                    value={dropPoint.storage.availableSlots}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">This is managed automatically by the system</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utilization">Utilization</Label>
                  <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
                    {`${(dropPoint.storage.utilization * 100).toFixed(1)}%`}
                  </div>
                  <p className="text-xs text-muted-foreground">Current storage utilization</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave("storage")}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
