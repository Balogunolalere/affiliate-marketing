"use client"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import DashboardTabs from "@/components/admin/dashboard-tabs"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  
  const handleLogout = () => {
    router.push("/auth/login")
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard</h2>
            <p className="text-muted-foreground">Manage your profile, links and analytics</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-foreground/80 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        <div className="soft-shadow">
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardTabs />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

