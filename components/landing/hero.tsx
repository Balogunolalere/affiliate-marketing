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
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    '/fi-1.jpg',
    '/fi-2.jpg'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 5000) // Switch every 5 seconds

    return () => clearInterval(timer)
  }, [])
  
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
      className="min-h-[90vh] flex items-center relative overflow-hidden bg-gradient-to-br from-background via-background/50 to-accent/10 pt-16 lg:pt-20"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div 
            ref={ref} 
            variants={containerVariants} 
            initial="hidden" 
            animate={controls} 
            className="space-y-6"
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-2xl md:text-3xl lg:text-4xl block mb-1 text-foreground/90">Transform Your Digital Business With</span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-shimmer relative inline-block text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                Digital BOSS Academy
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />  
              </span>{" "}
              <motion.span
                animate={{ 
                  opacity: [1, 0.6, 1],
                  scale: [1, 1.1, 1],
                  textShadow: [
                    "0 0 10px rgba(var(--primary), 0.5)",
                    "0 0 20px rgba(var(--primary), 0.8)",
                    "0 0 10px rgba(var(--primary), 0.5)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary inline-block relative ml-2 bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 10px rgba(var(--primary), 0.5)",
                }}
              >
                Now!
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-base md:text-lg text-foreground/80 max-w-lg"
            >
              Start your journey to digital marketing success today! Join our exclusive community and get instant access to premium PLR content, expert training, and proven MRR strategies. Sign up now to unlock your earning potential!
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
              <MagneticButton 
                className="group w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 py-3 px-6 text-base font-medium relative overflow-hidden"
                onClick={() => window.location.href = "https://stan.store/affiliates/c1da2e8f-818f-4ff0-bf45-9664e1588f82"}
                aria-label="Sign up through our affiliate link"
              >
                <motion.span 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
              <p className="text-sm text-foreground/70 bg-secondary/50 px-3 py-1.5 rounded-md border border-primary/5">
                Created by Billionaire B • <span className="text-primary font-medium">Official Affiliate Partner</span>
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
              <div className="relative group h-[480px] lg:h-[520px] rounded-2xl overflow-hidden shadow-xl shadow-primary/5 border border-primary/10">
                {images.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Digital Marketing Success"
                    width={600}
                    height={400}
                    className={`w-full max-w-lg mx-auto rounded-2xl object-cover filter dark:brightness-110 transition-opacity duration-1000 absolute top-0 left-0 h-full ${
                      currentImage === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    priority={index === 0}
                  />
                ))}
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
          <Link href="#about" aria-label="Scroll down" className="p-2 rounded-full bg-secondary/30 backdrop-blur-sm border border-primary/10 hover:bg-secondary/50 transition-colors">
            <ChevronDown className="w-6 h-6 text-primary/70 hover:text-primary transition-colors" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

