"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import MagneticButton from "@/components/ui/magnetic-button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Links", path: "/links" },
    { name: "Requirements", path: "/#contact" },
  ]

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-sm dark:bg-background/80 dark:border-primary/5" 
          : "bg-transparent"
      } py-4`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold gradient-text">Digital BOSS</h1>
          <span className="text-xs text-primary/80 border border-primary/20 px-2 py-0.5 rounded">Affiliate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.path ? "text-primary" : "text-foreground/80"
              }`}
            >
              {item.name}
              {pathname === item.path && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 to-primary"
                  layoutId="underline"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <MagneticButton 
              className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:opacity-90"
              onClick={() => window.location.href = "https://www.skool.com/signup?ref=ae11ec21464844c6b8873e5916f8d2fa"}
            >
              Sign Up (Affiliate)
            </MagneticButton>
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground/90 hover:text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                      pathname === item.path 
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
                  onClick={() => window.location.href = "https://www.skool.com/signup?ref=ae11ec21464844c6b8873e5916f8d2fa"}
                >
                  Sign Up (Affiliate)
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

