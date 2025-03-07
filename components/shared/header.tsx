"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import MagneticButton from "@/components/ui/magnetic-button"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { 
      name: "Home", 
      path: "/",
      isActive: pathname === "/"
    },
    { 
      name: "About", 
      path: "/#about",
      isActive: pathname === "/#about"
    },
    { 
      name: "Services", 
      path: "/#services",
      isActive: pathname === "/#services"
    },
    { 
      name: "Contact", 
      path: "/#contact",
      isActive: pathname === "/#contact"
    },
    {
      name: "Links",
      path: "/links",
      isActive: pathname === "/links"
    }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-sm dark:bg-background/80 dark:border-primary/5" 
          : "bg-transparent"
      } py-4`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logoimage-removebg-preview.png"
              alt="Digital BOSS Logo"
              width={50}
              height={50}
              className="transition-all group-hover:opacity-90"
            />
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-primary/80 border border-primary/20 px-2 py-0.5 rounded bg-primary/5"
            >
              Affiliate
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  href={item.path}
                  className={`relative text-sm font-medium transition-all hover:text-primary ${
                    item.isActive ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {item.name}
                  {item.isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 to-primary"
                      layoutId="underline"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </Link>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <MagneticButton 
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90"
                onClick={() => window.location.href = "https://stan.store/affiliates/c1da2e8f-818f-4ff0-bf45-9664e1588f82"}
                aria-label="Sign up through affiliate link"
              >
                Sign Up (Affiliate)
              </MagneticButton>
            </div>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground/90 hover:text-primary focus:text-foreground/90 focus:bg-transparent active:text-foreground/90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </Button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-y border-primary/10 p-4 md:hidden shadow-lg dark:bg-background/90"
                role="dialog"
                aria-label="Mobile menu"
              >
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors block ${
                        item.isActive 
                          ? "text-primary bg-primary/10" 
                          : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button 
                    className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90 w-full"
                    onClick={() => {
                      window.location.href = "https://stan.store/affiliates/c1da2e8f-818f-4ff0-bf45-9664e1588f82"
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Sign Up (Affiliate)
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

