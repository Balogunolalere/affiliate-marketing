"use client"

import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      title: "Digital Product Creation",
      description: "Transform your knowledge into profitable digital products, including courses, ebooks, and coaching programs.",
      icon: "✏️",
      features: [
        "Step-by-step product creation framework",
        "Content planning and organization",
        "Pricing strategy development",
        "Product launch planning"
      ]
    },
    {
      title: "Live Stream Mastery",
      description: "Master the art of profitable live streaming across major social platforms to build your audience and drive sales.",
      icon: "🎬",
      features: [
        "Platform-specific strategies",
        "Engagement techniques",
        "Monetization methods",
        "Content planning tools"
      ]
    },
    {
      title: "Sales Automation",
      description: "Set up automated sales funnels that convert viewers into customers while you focus on creating content.",
      icon: "⚙️",
      features: [
        "Funnel setup and optimization",
        "Email marketing automation",
        "Payment processing integration",
        "Analytics and tracking"
      ]
    }
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-accent/5" id="services">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10 pointer-events-none opacity-60" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div ref={ref} className="grid gap-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-secondary/80 px-3 py-1.5 text-sm text-primary font-medium border border-primary/10 shadow-sm mx-auto"
            >
              Premium Services
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expert Solutions</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-[700px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive digital business solutions to transform your knowledge into profitable revenue streams
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                className={cn(
                  "group relative flex flex-col p-6 space-y-4 rounded-xl border transition-all duration-300",
                  "bg-card/60 backdrop-blur-sm shadow-md hover:shadow-xl",
                  "hover:translate-y-[-5px] hover:border-primary/30",
                  "border-primary/10 hover:border-primary/30"
                )}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                {/* Service header */}
                <div className="flex items-center gap-4 z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-0.5 group-hover:shadow-lg transition-shadow duration-300">
                    <div className="w-full h-full flex items-center justify-center rounded-full bg-card text-2xl">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                </div>
                
                {/* Service description */}
                <p className="text-foreground/70">{service.description}</p>
                
                {/* Service features */}
                <ul className="space-y-2 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <motion.div 
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        animate={hoveredIndex === i ? { 
                          scale: [1, 1.2, 1], 
                          backgroundColor: ["rgba(var(--primary), 0.1)", "rgba(var(--primary), 0.2)", "rgba(var(--primary), 0.1)"] 
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="h-3 w-3 text-primary" />
                      </motion.div>
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Animated border on hover */}
                <div className={cn(
                  "absolute inset-0 rounded-xl border-2 border-transparent opacity-0",
                  "group-hover:opacity-100 transition-opacity duration-300",
                  hoveredIndex === i ? "border-primary/30" : ""
                )}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -top-[100%] animate-shine" />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center justify-center mt-8 pt-8"
          >
            <div className="p-4 bg-secondary/70 dark:bg-secondary/40 rounded-lg border border-primary/10 shadow-inner mb-6 max-w-2xl">
              <p className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="flex-shrink-0 text-primary mt-0.5">
                  <Star size={14} />
                </span>
                <span>
                  All of these services and more are included when you join the Digital BOSS Academy today. Get access to premium coaching, resources, and tools to scale your digital business.
                </span>
              </p>
            </div>
            
            <Button
              className="group bg-primary/90 hover:bg-primary text-primary-foreground py-3 px-6 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              onClick={() => window.location.href = "https://stan.store/affiliates/c1da2e8f-818f-4ff0-bf45-9664e1588f82"}
            >
              Join Digital BOSS Academy
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}