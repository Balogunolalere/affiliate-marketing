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
    <main className="min-h-[100dvh] w-full">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2">Dashboard</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your profile and links</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="self-end sm:self-auto text-foreground/80 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        <div className="soft-shadow">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-pulse text-primary/60">Loading...</div>
            </div>
          }>
            <DashboardTabs />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

