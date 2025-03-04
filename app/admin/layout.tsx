import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background/90 pt-20">
      {children}
    </div>
  )
}

