"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Twitter, Instagram, Youtube, Globe } from "lucide-react"

export default function ProfileHeader() {
  const [text, setText] = useState("")
  const fullText = "Digital marketer & affiliate partner"
  
  useEffect(() => {
    const interval = setInterval(() => {
      setText(fullText.substring(0, text.length + 1))
      if (text.length === fullText.length) {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [text])

  const socialLinks = [
    { href: "#", icon: <Twitter className="h-4 w-4" />, color: "#1da1f2" },
    { href: "#", icon: <Instagram className="h-4 w-4" />, color: "#e1306c" },
    { href: "#", icon: <Youtube className="h-4 w-4" />, color: "#ff0000" },
    { href: "#", icon: <Globe className="h-4 w-4" />, color: "#10b981" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-4"
    >
      {/* Profile Image */}
      <div className="relative mx-auto">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/20 mx-auto bg-gradient-to-br from-primary/20 to-transparent p-1 shadow-xl ring-2 ring-white/10 ring-offset-2 ring-offset-background/50">
          <div className="w-full h-full rounded-full overflow-hidden bg-background/50 backdrop-blur-sm">
            <Image
              src="/placeholder-user.jpg"
              alt="Profile Avatar"
              width={128}
              height={128}
              className="object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute bottom-0 right-1/2 translate-x-12 translate-y-0"
        >
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-lg">PRO</Badge>
        </motion.div>
      </div>

      {/* Name and Bio */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Alex Morgan</h1>
        <p className="text-sm text-foreground/70 h-6 font-medium">
          {text}
          <span className="animate-pulse text-primary">|</span>
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 pt-2">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            whileHover={{ y: -3, scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 rounded-full flex items-center justify-center text-white transition-all"
            style={{
              backgroundColor: link.color,
              boxShadow: `0 4px 12px ${link.color}40`
            }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

