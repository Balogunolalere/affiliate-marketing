"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MousePointerClick, 
  ArrowUp, 
  ArrowDown,
  ShoppingCart,
  DollarSign,
  Target
} from "lucide-react"

const clickData = [
  { name: "Mon", clicks: 120 },
  { name: "Tue", clicks: 145 },
  { name: "Wed", clicks: 260 },
  { name: "Thu", clicks: 210 },
  { name: "Fri", clicks: 240 },
  { name: "Sat", clicks: 180 },
  { name: "Sun", clicks: 190 },
]

const linkPerformance = [
  { name: "Premium Marketing Course", value: 35 },
  { name: "Smart Home Starter Kit", value: 25 },
  { name: "Twitter", value: 20 },
  { name: "Instagram", value: 15 },
  { name: "Other", value: 5 },
]

// Update the colors in the analytics dashboard
const COLORS = ["#9333ea", "#06b6d4", "#1da1f2", "#e1306c", "#9ca3af"]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    { title: "Total Clicks", value: "1,345", change: "+12.3%" },
    { title: "Conversion Rate", value: "3.2%", change: "+0.8%" },
    { title: "Avg. Time on Page", value: "1m 23s", change: "-5.1%" },
    { title: "Bounce Rate", value: "42%", change: "-2.5%" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Analytics Dashboard</h2>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Link Performance</h3>

        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background/50 border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-foreground/70">Total Clicks</p>
                <p className="text-2xl font-bold text-foreground">12,543</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MousePointerClick className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">12.5%</span>
              <span className="text-sm text-foreground/70">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-foreground/70">Conversions</p>
                <p className="text-2xl font-bold text-foreground">845</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">8.2%</span>
              <span className="text-sm text-foreground/70">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-foreground/70">Revenue</p>
                <p className="text-2xl font-bold text-foreground">$24,562</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">15.3%</span>
              <span className="text-sm text-foreground/70">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-foreground/70">CTR</p>
                <p className="text-2xl font-bold text-foreground">3.2%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <ArrowDown className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">0.8%</span>
              <span className="text-sm text-foreground/70">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clicks" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="clicks" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
            Clicks
          </TabsTrigger>
          <TabsTrigger
            value="distribution"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            Link Distribution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clicks" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Click Performance</CardTitle>
              <CardDescription>Number of clicks per day over the selected time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={clickData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#9333ea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Link Distribution</CardTitle>
              <CardDescription>Percentage of clicks by link</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={linkPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {linkPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

