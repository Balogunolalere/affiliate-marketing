"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileForm from "@/components/admin/profile-form"
import LinksManager from "@/components/admin/links-manager"

export default function DashboardTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && (tab === "profile" || tab === "links")) {
      setActiveTab(tab)
    } else {
      setActiveTab("profile")
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/admin/dashboard?tab=${value}`, { scroll: false })
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4 sm:space-y-6">
      <TabsList className="w-full bg-background/70 border border-primary/20 p-1 sm:p-1.5 rounded-lg sm:rounded-xl shadow-sm grid grid-cols-2 gap-1">
        <TabsTrigger
          value="profile"
          className="text-foreground/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2 sm:py-2.5 text-sm sm:text-base transition-all font-medium"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="links"
          className="text-foreground/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2 sm:py-2.5 text-sm sm:text-base transition-all font-medium"
        >
          Links
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <div className="bg-card border border-primary/20 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm">
          <ProfileForm />
        </div>
      </TabsContent>
      <TabsContent value="links" className="space-y-4">
        <div className="bg-card border border-primary/20 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm">
          <LinksManager />
        </div>
      </TabsContent>
    </Tabs>
  )
}

