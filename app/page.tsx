import type { Metadata } from "next"
// Dynamic imports to work around TypeScript import resolution issues
import dynamic from "next/dynamic"

const Hero = dynamic(() => import("@/components/landing/hero"), { ssr: true })
const About = dynamic(() => import("@/components/landing/about"), { ssr: true })
const Services = dynamic(() => import("@/components/landing/services"), { ssr: true })
const Testimonials = dynamic(() => import("@/components/landing/testimonials"), { ssr: true })
const Contact = dynamic(() => import("@/components/landing/contact"), { ssr: true })

export const metadata: Metadata = {
  title: "Digital BOSS Academy | The Ultimate Affiliate Program",
  description:
    "Create profitable digital products, master live streaming, and earn commissions with the Digital BOSS Academy comprehensive training program.",
  keywords: "digital marketing, affiliate program, digital products, live streaming, passive income, high commission, PLR content, MRR strategies",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  )
}

