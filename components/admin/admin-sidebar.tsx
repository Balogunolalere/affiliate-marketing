"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, LinkIcon, User, Settings, BarChart, LogOut } from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Links",
      icon: <LinkIcon className="h-5 w-5" />,
      href: "/admin/dashboard?tab=links",
    },
    {
      title: "Profile",
      icon: <User className="h-5 w-5" />,
      href: "/admin/dashboard?tab=profile",
    },
    {
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      href: "/admin/dashboard?tab=analytics",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/dashboard?tab=settings",
    },
  ]
  
  return (
    <aside className="h-screen sticky top-0 flex flex-col bg-gradient-to-b from-secondary/80 to-background border-r border-primary/10 soft-shadow">
      <div className="p-6 border-b border-primary/20">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold gradient-text transition-all hover:opacity-90">AffiliateX</h1>
        </Link>
      </div>
      
      <nav className="flex-1 p-5 overflow-y-auto hide-scrollbar">
        <div className="space-y-2.5">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href.includes("?tab=") && pathname + item.href.substring(item.href.indexOf("?")) === item.href)
            
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary/90 text-primary-foreground font-medium shadow-md"
                    : "text-foreground/80 hover:bg-accent/50 hover:text-primary hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={isActive ? "text-primary-foreground" : "text-primary/80"}>
                    {item.icon}
                  </div>
                  <span className={isActive ? "" : "font-medium"}>{item.title}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-2 h-2 rounded-full bg-primary-foreground"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
      
      <div className="p-5 border-t border-primary/20 bg-background/50 backdrop-blur-sm">
        <Link
          href="/auth/logout"
          className="flex items-center gap-3.5 px-4 py-3.5 text-foreground/80 hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  )
}

