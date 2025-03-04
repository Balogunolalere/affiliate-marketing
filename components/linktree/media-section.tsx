"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MediaSection() {
  const resources = [
    {
      id: 1,
      name: "Free Marketing E-book",
      description: "The ultimate guide to affiliate marketing",
      icon: "📚",
      color: "#0ea5e9",
    },
    {
      id: 2,
      name: "SEO Checklist",
      description: "Boost your content ranking today",
      icon: "🔍",
      color: "#8b5cf6",
    },
    {
      id: 3,
      name: "Email Templates",
      description: "Ready-to-use marketing templates",
      icon: "📧",
      color: "#10b981",
    },
  ]
  
  return (
    <div className="space-y-6">
      <div className="text-center opacity-80">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
      </div>

      {/* Free Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-sm font-medium text-white/60 px-1">FREE RESOURCES</h2>
        <div className="grid gap-3">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.id}
              href="#"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="block"
            >
              <Card 
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm" 
                style={{ 
                  background: `linear-gradient(135deg, ${resource.color}15, transparent)`,
                  borderLeft: `3px solid ${resource.color}` 
                }}
              >
                <CardContent className="p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">{resource.icon}</div>
                    <div>
                      <h3 className="font-medium text-foreground/90">{resource.name}</h3>
                      <p className="text-xs text-foreground/60 mt-0.5">{resource.description}</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-foreground/70 group-hover:translate-y-[-2px] transition-transform" />
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-8 text-center"
      >
        <a 
          href="#" 
          className="text-xs text-foreground/50 flex items-center justify-center gap-1.5 hover:text-foreground/70 transition-colors group"
        >
          Made with AffiliateX <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </div>
  )
}

