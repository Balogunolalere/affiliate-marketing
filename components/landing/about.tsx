"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Check, Play, ChevronRight, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  
  const stats = [
    { 
      label: "Official Members", 
      value: "27.7k+", 
      description: "Join our thriving community of successful digital entrepreneurs" 
    },
    { 
      label: "Success Rate", 
      value: "89%", 
      description: "Members who actively implement our strategies see significant results" 
    },
    { 
      label: "Commission Rate", 
      value: "Up to 50%", 
      description: "Earn competitive commissions on successful referrals to our program" 
    },
  ]
  
  const tabContent = [
    {
      title: "Program Features",
      features: [
        "Access to premium Digital Marketing training worth over $5,000",
        "Exclusive rights to sell high-value digital products",
        "Weekly live coaching sessions with industry experts",
        "Advanced affiliate marketing strategies and tools",
        "Done-for-you marketing materials and templates",
        "Private community access for networking and support",
        "Regular product updates and new releases",
        "Priority technical support and guidance"
      ]
    },
    {
      title: "Earning Potential",
      features: [
        "Multiple income streams through digital product sales",
        "High-ticket commissions up to $2,000 per sale",
        "Recurring revenue from subscription-based products",
        "Passive income through automated sales funnels",
        "Performance bonuses and incentive programs",
        "Team building and downline commissions",
        "Global market reach without geographical limitations",
        "Scalable business model with minimal overhead"
      ]
    },
    {
      title: "Getting Started",
      features: [
        "Simple 3-step registration process through our link",
        "Comprehensive onboarding and orientation session",
        "Immediate access to product catalog and resources",
        "Personal success coach assignment",
        "Step-by-step implementation roadmap",
        "Marketing tools and promotional materials setup",
        "Payment system integration and setup assistance",
        "30-day quick-start action plan for success"
      ]
    }
  ]

  return (
    <section 
      id="about" 
      className="py-16 relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-accent/10"
      ref={ref}
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10 pointer-events-none opacity-60" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-secondary/80 px-3 py-1.5 text-sm text-primary font-medium border border-primary/10 shadow-sm"
            >
              About The Program
            </motion.div>
            
            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-4xl font-bold text-foreground"
            >
              We're Here to Help You <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Join Digital BOSS Academy</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <TooltipProvider key={index}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="p-4 rounded-lg bg-secondary/50 dark:bg-secondary/30 border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-help"
                        whileHover={{ y: -5 }}
                      >
                        <div className="text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-foreground/70 flex items-center gap-1">
                          {stat.label}
                          <Info size={12} className="text-primary/70" />
                        </div>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="bottom" 
                      className="bg-secondary/90 backdrop-blur-sm border border-primary/20 text-foreground/90 p-3 shadow-lg"
                    >
                      {stat.description}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 bg-secondary/70 dark:bg-secondary/40 rounded-lg border border-primary/10 shadow-inner"
            >
              <p className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-primary mt-0.5">
                  <Info size={14} />
                </span>
                <span>
                  <span className="font-semibold text-primary">Affiliate Disclosure:</span> Information on this page is based on the official Digital BOSS Academy program. As an affiliate, we may receive a commission for referrals at no extra cost to you.
                </span>
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <Button 
                className="group bg-primary/90 hover:bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                onClick={() => window.location.href = "https://www.skool.com/signup?ref=ae11ec21464844c6b8873e5916f8d2fa"}
              >
                Join Now
                <motion.span 
                  className="ml-1.5 inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronRight size={16} />
                </motion.span>
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow border border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6 overflow-x-auto scrollbar-hide">
                  {tabContent.map((tab, index) => (
                    <Badge 
                      key={index}
                      variant={activeTab === index ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer py-1.5 px-3 transition-all duration-200",
                        activeTab === index 
                          ? "bg-primary hover:bg-primary/90" 
                          : "bg-transparent hover:bg-secondary/70 text-foreground/70 hover:text-foreground"
                      )}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab.title}
                    </Badge>
                  ))}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center">
                      <span>{tabContent[activeTab].title}</span>
                      <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    </h3>
                    
                    <ul className="space-y-3 mb-6">
                      {tabContent[activeTab].features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                          className={cn(
                            "flex items-center gap-3 text-foreground/80 rounded-lg p-2 transition-all duration-200",
                            hoveredFeature === index 
                              ? "bg-accent/20 border-l-2 border-primary" 
                              : "border-l-2 border-transparent"
                          )}
                          onMouseEnter={() => setHoveredFeature(index)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
                          <motion.div 
                            className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                            animate={hoveredFeature === index ? { 
                              scale: [1, 1.2, 1], 
                              backgroundColor: ["rgba(var(--primary), 0.1)", "rgba(var(--primary), 0.2)", "rgba(var(--primary), 0.1)"] 
                            } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <Check className="h-3 w-3 text-primary" />
                          </motion.div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="relative rounded-xl overflow-hidden">
                      <Image
                        src="https://illustrations.popsy.co/white/remote-work.svg"
                        alt="Digital Marketing Success Illustration"
                        width={400}
                        height={200}
                        className={cn(
                          "w-full h-48 object-contain rounded-lg dark:brightness-110 transition-all duration-500",
                          activeTab === 0 ? "scale-100 rotate-0" : 
                          activeTab === 1 ? "scale-105 rotate-1" : "scale-95 rotate-0"
                        )}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent dark:from-card" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

