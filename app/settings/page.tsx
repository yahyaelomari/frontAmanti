"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { GeneralSettings } from "@/components/settings/general/general-settings"
import { AccountSettings } from "@/components/settings/account/account-settings"
import { StorageSettings } from "@/components/settings/storage/storage-settings"
import { fetchDropPointProfile, updateDropPointProfile } from "@/lib/api"

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [dropPoint, setDropPoint] = useState<any>(null)
  const [idCardFrontFile, setIdCardFrontFile] = useState<File | null>(null)
  const [idCardBackFile, setIdCardBackFile] = useState<File | null>(null)
  const [idCardFrontPreview, setIdCardFrontPreview] = useState<string | null>(null)
  const [idCardBackPreview, setIdCardBackPreview] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDropPointProfile()
        if (data) {
          setDropPoint(data)
          if (data.identityCardFrontUrl) {

            setIdCardFrontPreview(`${process.env.REACT_APP_BACKEND_URL}${data.identityCardFrontUrl}`)
          }
          if (data.identityCardBackUrl) {
            setIdCardBackPreview(`${process.env.REACT_APP_BACKEND_URL}${data.identityCardBackUrl}`)
          }
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to load data", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSave = async (section: string) => {
    if (!dropPoint) return;

    try {
      // Prepare the data structure matching your backend's DTO
      const updateData = {
        name: dropPoint.name,
        description: dropPoint.description,
        openingTime: dropPoint.openingTime,
        closingTime: dropPoint.closingTime,
        latitude: dropPoint.latitude,
        longitude: dropPoint.longitude,
        account: {
          firstName: dropPoint.account.firstName,
          lastName: dropPoint.account.lastName,
          phone: dropPoint.account.phone,
          // Add missing required fields
          email: dropPoint.account.email,
          role: "DROP_POINT",
          address: {
            street: dropPoint.account.address.street,
            city: dropPoint.account.address.city,
            state: dropPoint.account.address.state,
            zipCode: dropPoint.account.address.zipCode
          }
        },
        storage: {
          totalSlots: dropPoint.storage.totalSlots
        }
      };

      // Handle file uploads
      const getFile = async (url: string, defaultName: string) => {
        if (!url) return new File([], defaultName);
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`);
          const blob = await response.blob();
          return new File([blob], url.split('/').pop() || defaultName, {
            type: blob.type
          });
        } catch (error) {
          console.error("Error fetching file:", url);
          return new File([], defaultName);
        }
      };

      const frontFile = idCardFrontFile ||
          await getFile(dropPoint.identityCardFrontUrl, 'front.jpg');
      const backFile = idCardBackFile ||
          await getFile(dropPoint.identityCardBackUrl, 'back.jpg');

      if (!(frontFile.size > 0 && backFile.size > 0)) {
        throw new Error("Both ID card images are required");
      }

      await updateDropPointProfile(updateData, frontFile, backFile);

      toast({
        title: "Success!",
        description: "Settings updated successfully",
      });

      // Refresh data after update
      const updatedData = await fetchDropPointProfile();
      setDropPoint(updatedData);

    } catch (error) {
      console.error("Update failed:", error);
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchExistingFile = async (url: string): Promise<File> => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`)
    const blob = await response.blob()
    return new File([blob], url.split('/').pop() || 'file.jpg', { type: blob.type })
  }

  const handleIdCardChange = (type: 'front' | 'back', file: File) => {
    const preview = URL.createObjectURL(file)
    type === 'front' ? setIdCardFrontPreview(preview) : setIdCardBackPreview(preview)
    type === 'front' ? setIdCardFrontFile(file) : setIdCardBackFile(file)
  }

  if (loading) return <div className="h-64 flex items-center justify-center">Loading...</div>
  if (!dropPoint) return <div className="h-64 flex items-center justify-center">No data found</div>

  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettings
                dropPoint={dropPoint}
                onInputChange={(e) => setDropPoint(p => ({ ...p, [e.target.name]: e.target.value }))}
                onTimeChange={(field, value) => setDropPoint(p => ({ ...p, [field]: value }))}
                onLocationChange={(lat, lng) => setDropPoint(p => ({ ...p, latitude: lat, longitude: lng }))}
                onSave={() => handleSave("general")}
            />
          </TabsContent>

          <TabsContent value="account">
            <AccountSettings
                account={dropPoint.account}
                idCardFrontPreview={idCardFrontPreview}
                idCardBackPreview={idCardBackPreview}
                onAccountInputChange={(e) => setDropPoint(p => ({
                  ...p,
                  account: { ...p.account, [e.target.name]: e.target.value }
                }))}
                onAddressInputChange={(e) => setDropPoint(p => ({
                  ...p,
                  account: { ...p.account, address: { ...p.account.address, [e.target.name]: e.target.value } }
                }))}
                onIdCardFrontChange={(e) => e.target.files?.[0] && handleIdCardChange('front', e.target.files[0])}
                onIdCardBackChange={(e) => e.target.files?.[0] && handleIdCardChange('back', e.target.files[0])}
                onSave={() => handleSave("account")}
            />
          </TabsContent>

          <TabsContent value="storage">
            <StorageSettings
                storage={dropPoint.storage}
                onStorageChange={(e) => setDropPoint(p => ({
                  ...p,
                  storage: { ...p.storage, [e.target.name]: Number(e.target.value) }
                }))}
                onSave={() => handleSave("storage")}
            />
          </TabsContent>
        </Tabs>
      </div>
  )
}