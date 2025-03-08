"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Globe, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Success Stories", href: "/#testimonials" },
    { name: "Join Through Our Link", href: "https://stan.store/affiliates/c1da2e8f-818f-4ff0-bf45-9664e1588f82" },
    { name: "Requirements", href: "/#contact" },
  ]

  return (
    <footer className="bg-gradient-to-b from-background via-background to-accent/10 border-t border-primary/5">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logoimage-removebg-preview.png"
                alt="Digital BOSS Logo"
                width={40}
                height={40}
                className="transition-all"
              />
              <span className="text-xs text-primary border border-primary/20 px-2 py-0.5 rounded-full">Official Affiliate</span>
            </div>
            <p className="text-foreground/70 text-sm">
              Join Digital BOSS Academy through our official affiliate link. Sign up today to access their premium digital marketing community and resources.
            </p>
            <div className="p-3 bg-secondary/50 dark:bg-secondary/30 rounded-lg border border-primary/10">
              <p className="text-xs text-foreground/70">
                Affiliate Disclosure: As an official affiliate partner, we may earn a commission when you sign up through our links, at no additional cost to you.
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={() => window.location.href = "https://stan.store/affiliates/c1da2e8f-818f-4ff0-bf45-9664e1588f82"}
                className="bg-primary/90 hover:bg-primary text-primary-foreground transition-all w-full sm:w-auto"
              >
                Join Now
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground/90">Quick Links</h3>
            <ul className="grid grid-cols-1 gap-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary/80 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground/90">Support Links</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <a 
                  href="tel:+447592224233"
                  className="flex items-center gap-2 text-sm text-foreground/70 group p-2 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary group-hover:text-primary transition-colors" />
                  <div>
                    <p className="group-hover:text-primary transition-colors">+44 7592 224233</p>
                    <p className="text-xs text-foreground/50">(Support Line)</p>
                  </div>
                </a>
                <div className="flex items-center gap-2 text-sm text-foreground/70 group p-2 rounded-md hover:bg-secondary/50 transition-colors">
                  <Mail className="h-4 w-4 text-primary group-hover:text-primary transition-colors" />
                  <div>
                    <p className="group-hover:text-primary transition-colors">info@dbaincomeboost.com</p>
                    <p className="text-xs text-foreground/50">(Official Support)</p>
                  </div>
                </div>
                <a 
                  href="https://www.digitalbossacademy.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground/70 group p-2 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  <Globe className="h-4 w-4 text-primary group-hover:text-primary transition-colors" />
                  <div>
                    <p className="group-hover:text-primary transition-colors">www.digitalbossacademy.co</p>
                    <p className="text-xs text-foreground/50">(Official Site)</p>
                  </div>
                </a>
              </div>
              
              <div className="p-3 bg-secondary/30 rounded-lg text-sm text-foreground/70 border border-primary/5">
                <p>Have questions about the program? See the <Link href="/#contact" className="text-primary hover:underline">FAQ section</Link> or contact us directly.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-center text-sm text-foreground/60">
              © {new Date().getFullYear()} | Official Affiliate Partner of Digital BOSS Academy
            </p>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-xs text-foreground/60 hover:text-primary transition-colors"
            >
              Back to top
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-45">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

