import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Globe } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Join Through Our Link", href: "https://www.skool.com/signup?ref=ae11ec21464844c6b8873e5916f8d2fa" },
    { name: "Requirements", href: "/#contact" },
  ]

  const disclosures = [
    "This website is not affiliated with or endorsed by Digital BOSS Academy.",
    "We are an independent affiliate promoting their services.",
    "We may receive a commission when you sign up through our links.",
  ]

  return (
    <footer className="bg-gradient-to-b from-background via-background to-accent/10 border-t border-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold gradient-text">Digital BOSS</h3>
              <span className="text-xs text-primary/80 border border-primary/20 px-2 py-0.5 rounded">Affiliate Site</span>
            </div>
            <p className="text-foreground/70 text-sm">
              Join Digital BOSS Academy through our affiliate link. Sign up today to access their premium digital marketing community and resources.
            </p>
            <div className="p-3 bg-secondary/50 dark:bg-secondary/30 rounded-lg border border-primary/10">
              <p className="text-xs text-foreground/70">
                Affiliate Disclosure: As an independent affiliate, we may earn a commission when you sign up through our links, at no additional cost to you.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground/90">Quick Links</h3>
            <ul className="space-y-2">
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

          {/* Disclosures */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground/90">Important Disclosures</h3>
            <ul className="space-y-2">
              {disclosures.map((disclosure, index) => (
                <li key={index} className="text-sm text-foreground/70 flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary/30 mt-2" />
                  {disclosure}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground/90">Support Links</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/70 group">
                <Mail className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">helpdigitalboss@gmail.com</span>
                <span className="text-xs text-primary/80">(Official Support)</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/70 group">
                <Globe className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                <a 
                  href="https://www.digitalbossacademy.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group-hover:text-primary transition-colors"
                >
                  www.digitalbossacademy.co
                </a>
                <span className="text-xs text-primary/80">(Official Site)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10">
          <p className="text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} | Independent Affiliate Site | Not affiliated with Digital BOSS Academy
          </p>
        </div>
      </div>
    </footer>
  )
}

