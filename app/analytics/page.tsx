"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-gray-500">+12% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,580</div>
            <p className="text-xs text-gray-500">+8% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8 days</div>
            <p className="text-xs text-gray-500">-0.3 days from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-gray-500">+0.2 from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
              <CardDescription>Number of orders processed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={getOrderTrendsData(timeRange)}
                xAxisKey="date"
                series={[{ key: "orders", label: "Orders" }]}
                height={350}
              />
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>Current status of all orders</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Processing", value: 15, color: "#3b82f6" },
                    { name: "Delivering", value: 22, color: "#f59e0b" },
                    { name: "In Stock", value: 34, color: "#10b981" },
                    { name: "Collected", value: 18, color: "#6366f1" },
                    { name: "Returned", value: 11, color: "#ef4444" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Orders by Ecom Store</CardTitle>
                <CardDescription>Distribution of orders by store</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "Fashion Store", value: 78 },
                    { name: "Electronics Hub", value: 65 },
                    { name: "Home Goods", value: 42 },
                    { name: "Beauty Shop", value: 34 },
                    { name: "Sports Outlet", value: 28 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Trends</CardTitle>
              <CardDescription>Revenue over time by payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={getPaymentTrendsData(timeRange)}
                xAxisKey="date"
                series={[
                  { key: "shopify", label: "Shopify" },
                  { key: "cod", label: "Cash on Delivery" },
                ]}
                height={350}
                stacked={false}
              />
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>Breakdown by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Shopify", value: 68, color: "#3b82f6" },
                    { name: "Cash on Delivery", value: 32, color: "#10b981" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Current status of all payments</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Completed", value: 72, color: "#10b981" },
                    { name: "Pending", value: 24, color: "#f59e0b" },
                    { name: "Failed", value: 4, color: "#ef4444" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Utilization Over Time</CardTitle>
              <CardDescription>Percentage of storage capacity used</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={getStorageUtilizationData(timeRange)}
                xAxisKey="date"
                series={[{ key: "utilization", label: "Utilization %" }]}
                height={350}
              />
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Storage Status</CardTitle>
                <CardDescription>Breakdown of storage slots</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Available", value: 30, color: "#10b981" },
                    { name: "In Use", value: 70, color: "#3b82f6" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Storage Time</CardTitle>
                <CardDescription>How long packages stay in storage</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "< 1 day", value: 15 },
                    { name: "1-2 days", value: 32 },
                    { name: "3-5 days", value: 28 },
                    { name: "6-10 days", value: 18 },
                    { name: "> 10 days", value: 7 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Processing Time Trends</CardTitle>
              <CardDescription>Average days from order to pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={getProcessingTimeData(timeRange)}
                xAxisKey="date"
                series={[{ key: "days", label: "Days" }]}
                height={350}
              />
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Ratings</CardTitle>
                <CardDescription>Distribution of customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "5 Stars", value: 68 },
                    { name: "4 Stars", value: 22 },
                    { name: "3 Stars", value: 7 },
                    { name: "2 Stars", value: 2 },
                    { name: "1 Star", value: 1 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Issue Resolution</CardTitle>
                <CardDescription>Average time to resolve issues</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "Missing Items", value: 1.2 },
                    { name: "Damaged Package", value: 1.8 },
                    { name: "Wrong Item", value: 1.5 },
                    { name: "Payment Issues", value: 0.8 },
                    { name: "Delivery Delay", value: 1.1 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions to generate mock data
function getOrderTrendsData(timeRange: string) {
  const days = Number.parseInt(timeRange)
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate some realistic looking data with weekly patterns
    const dayOfWeek = date.getDay()
    const baseValue = 8 // Base number of orders
    const weekendDip = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1 // Weekend has fewer orders
    const randomVariation = 0.8 + Math.random() * 0.4 // Random variation between 0.8 and 1.2
    const trend = 1 + (days - i) * 0.002 // Slight upward trend over time

    const orders = Math.round(baseValue * weekendDip * randomVariation * trend)

    data.push({
      date: date.toISOString().split("T")[0],
      orders,
    })
  }

  return data
}

function getPaymentTrendsData(timeRange: string) {
  const days = Number.parseInt(timeRange)
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate some realistic looking data
    const dayOfWeek = date.getDay()
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1
    const randomVariation = 0.8 + Math.random() * 0.4
    const trend = 1 + (days - i) * 0.003

    const shopifyBase = 350 // Shopify payments are higher
    const codBase = 150 // COD payments are lower

    const shopify = Math.round(shopifyBase * weekendFactor * randomVariation * trend)
    const cod = Math.round(codBase * weekendFactor * randomVariation * trend)

    data.push({
      date: date.toISOString().split("T")[0],
      shopify,
      cod,
    })
  }

  return data
}

function getStorageUtilizationData(timeRange: string) {
  const days = Number.parseInt(timeRange)
  const data = []
  const now = new Date()

  // Start with a base utilization
  let utilization = 65

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some random variation but keep within realistic bounds
    const randomChange = Math.random() * 6 - 3 // Random change between -3 and +3
    utilization += randomChange

    // Keep utilization between 50% and 90%
    utilization = Math.max(50, Math.min(90, utilization))

    data.push({
      date: date.toISOString().split("T")[0],
      utilization: Math.round(utilization),
    })
  }

  return data
}

function getProcessingTimeData(timeRange: string) {
  const days = Number.parseInt(timeRange)
  const data = []
  const now = new Date()

  // Start with a base processing time
  let processingDays = 2.2

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some random variation but with a slight downward trend (improvement)
    const randomChange = Math.random() * 0.2 - 0.1 // Random change between -0.1 and +0.1
    const trend = -0.002 // Slight improvement over time

    processingDays += randomChange + trend

    // Keep processing time between 1.5 and 3 days
    processingDays = Math.max(1.5, Math.min(3, processingDays))

    data.push({
      date: date.toISOString().split("T")[0],
      days: Number.parseFloat(processingDays.toFixed(1)),
    })
  }

  return data
}
