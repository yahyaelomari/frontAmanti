"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

export default function StorageCapacity() {
  const [storage, setStorage] = useState({
    totalSlots: 50,
    availableSlots: 15,
    utilization: 70,
  })

  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Simulating API call
    const fetchStorage = async () => {
      // const response = await fetch('/api/storage');
      // const data = await response.json();
      // setStorage(data);
    }

    fetchStorage()
  }, [])

  return (
      <Card>
        <CardHeader>
          <CardTitle>Storage Capacity</CardTitle>
          <CardDescription>Monitor your drop point storage utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Utilization</p>
                <p className="text-3xl font-bold">{storage.utilization}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Available Slots</p>
                <p className="text-3xl font-bold">
                  {storage.availableSlots}/{storage.totalSlots}
                </p>
              </div>
            </div>
            <Progress value={storage.utilization} className="h-2" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                <p className="font-medium">Processing</p>
                <p className="text-lg">5</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                <p className="font-medium">In Stock</p>
                <p className="text-lg">24</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                <p className="font-medium">Ready for Pickup</p>
                <p className="text-lg">6</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}
