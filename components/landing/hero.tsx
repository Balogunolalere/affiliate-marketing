"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import MagneticButton from "@/components/ui/magnetic-button"
import { cn } from "@/lib/utils"

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [isHovered, setIsHovered] = useState(false)
  
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }
  
  const floatingShapes = [
    { top: "10%", left: "60%", delay: 0, size: "w-12 h-12", color: "from-primary/20 to-secondary/20" },
    { top: "60%", left: "75%", delay: 1, size: "w-16 h-16", color: "from-accent/20 to-primary/20" },
    { top: "30%", left: "85%", delay: 2, size: "w-10 h-10", color: "from-secondary/20 to-accent/20" },
    { top: "75%", left: "15%", delay: 1.5, size: "w-14 h-14", color: "from-primary/10 to-accent/20" },
    { top: "15%", left: "20%", delay: 2.5, size: "w-10 h-10", color: "from-accent/10 to-secondary/20" },
  ]

  return (
    <section 
      className="min-h-[90vh] pt-24 pb-12 flex items-center relative overflow-hidden bg-gradient-to-br from-background via-background/50 to-accent/10"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            ref={ref} 
            variants={containerVariants} 
            initial="hidden" 
            animate={controls} 
            className="space-y-8"
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-shimmer"
            >
              Join <span className="text-primary relative inline-block">
                Digital BOSS Academy
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />  
              </span> Through Our Exclusive Affiliate Link
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-base md:text-lg text-foreground/80 max-w-lg"
            >
              Get started with the #1 MRR & PLR Digital Marketing Community! Sign up through our link and join thousands of successful digital marketers. 
              <span className="text-xs text-primary ml-1 hover:underline cursor-help" aria-label="Affiliate disclosure" title="We may receive a commission at no additional cost to you">
                (Affiliate Disclosure)
              </span>
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <MagneticButton 
                className="group w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                onClick={() => window.location.href = "https://www.skool.com/signup?ref=ae11ec21464844c6b8873e5916f8d2fa"}
                aria-label="Sign up through our affiliate link"
              >
                <span>Sign Up Now</span>
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={16} className="inline" />
                </motion.span>
              </MagneticButton>
              
              <Link
                href="#about"
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary/20 bg-secondary/50 hover:bg-accent/20 hover:border-primary/40 hover:text-primary transition-all duration-300 w-full sm:w-auto text-foreground/80 relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Learn more about our program"
              >
                <span className="relative z-10">Learn More</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "0%" : "-100%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="ml-1 bg-primary/20 rounded-full p-1 relative z-10"
                  animate={{ scale: isHovered ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play size={14} className="text-primary fill-primary" />
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-secondary/80 shadow-sm rounded-md flex items-center justify-center text-sm text-foreground/90 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Official Member Count: 
                  </motion.span>
                  <motion.span 
                    className="ml-1 text-primary font-medium" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    27.7k+
                  </motion.span>
                </div>
                <div className="px-3 py-1.5 bg-secondary/80 shadow-sm rounded-md flex items-center justify-center text-sm text-foreground/90 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    Potential Profit: 
                  </motion.span>
                  <motion.span 
                    className="ml-1 text-primary font-medium" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    100%
                  </motion.span>
                </div>
              </div>
              <p className="text-sm text-foreground/70">
                Created by Billionaire B • <span className="text-primary">Promoted by Independent Affiliate</span>
              </p>
            </motion.div>
          </motion.div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative z-10"
            >
              <div className="relative group">
                <Image
                  src="https://images.unsplash.com/photo-1611948018673-3d54b3026e29?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Digital Marketing Success"
                  width={600}
                  height={400}
                  className="w-full max-w-lg mx-auto rounded-2xl object-cover filter dark:brightness-110 transition-all duration-300 group-hover:scale-[1.02]"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-background to-transparent dark:from-background/50 dark:to-transparent"
                  animate={{ opacity: [0.7, 0.5, 0.7] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            {floatingShapes.map((shape, index) => (
              <motion.div
                key={index}
                className={cn(
                  "absolute rounded-full bg-gradient-to-r backdrop-blur-md", 
                  shape.size, 
                  shape.color
                )}
                style={{ top: shape.top, left: shape.left }}
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: shape.delay,
                }}
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <Link href="#about" aria-label="Scroll down">
            <ChevronDown className="w-8 h-8 text-primary/70 hover:text-primary transition-colors" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

