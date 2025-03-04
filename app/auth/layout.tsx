import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background/90 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  )
}