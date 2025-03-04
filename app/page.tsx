import type { Metadata } from "next"
// Dynamic imports to work around TypeScript import resolution issues
import dynamic from "next/dynamic"

const Hero = dynamic(() => import("@/components/landing/hero"), { ssr: true })
const About = dynamic(() => import("@/components/landing/about"), { ssr: true })
const Contact = dynamic(() => import("@/components/landing/contact"), { ssr: true })

export const metadata: Metadata = {
  title: "AffiliateX | Elevate Your Earnings",
  description:
    "Join our premium affiliate program and maximize your passive income with high-converting opportunities and industry-leading commissions.",
  keywords: "affiliate marketing, passive income, high commission, affiliate program, opportunities",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Contact />
    </main>
  )
}

