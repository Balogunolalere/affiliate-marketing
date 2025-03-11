"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Phone, CheckCircle, AlertCircle, ArrowRight, HelpCircle, ChevronRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Country codes data
const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+61", country: "Australia" },
  { code: "+7", country: "Russia" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
  { code: "+1", country: "Canada" },
  { code: "+82", country: "South Korea" },
  // Add more country codes as needed
].sort((a, b) => a.country.localeCompare(b.country))

// FAQ data for accordion
const faqs = [
  {
    question: "Who is this program for?",
    answer: "This program is perfect for anyone who wants to create and sell digital products, from beginners to experienced business owners. It's also ideal for entrepreneurs looking to monetize their social media presence through live streaming and those seeking a done-for-you system with templates to reduce setup time."
  },
  {
    question: "What if I don't have a product idea yet?",
    answer: "No problem! Volume One includes detailed training on how to come up with product ideas and create them from scratch. The program guides you through the entire process of turning your knowledge, skills, or passions into sellable digital products."
  },
  {
    question: "How quickly can I see results?",
    answer: "Results vary depending on your consistency, marketing efforts, and prior experience. Some members report making sales within days of implementing the strategies; others take a bit longer. Many of our members achieve their first sales within their first few weeks."
  },
  {
    question: "What does the affiliate program include?",
    answer: "You get a unique referral link, marketing materials, and commissions on sales generated through your link. The program also provides comprehensive affiliate training with step-by-step guides to help you maximize your earnings."
  },
  {
    question: "Is there any support if I get stuck?",
    answer: "Absolutely. You'll have access to the private community, monthly Q&A sessions, and support from experienced coaches. Our community platform is ranked #1 and provides a space where you can connect with like-minded entrepreneurs."
  }
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    countryCode: "+1",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { toast } = useToast()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      })

      // Reset form after a delay to show success state
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          countryCode: "+1",
          phone: "",
          message: "",
        })
        setSubmitStatus("idle")
        if (formRef.current) {
          formRef.current.reset()
        }
      }, 2000)
    } catch (error) {
      setSubmitStatus("error")
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <section 
      id="contact" 
      className="py-16 relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-accent/10"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10 pointer-events-none opacity-60" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-secondary/80 px-3 py-1.5 text-sm text-primary font-medium border border-primary/10 shadow-sm"
            >
              Sign Up Process
            </motion.div>
            
            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-4xl font-bold mt-4 mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Ready to Join <span className="text-primary">Digital BOSS Academy?</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground"
            >
              <div className="bg-secondary/50 dark:bg-secondary/30 rounded-lg p-4 border border-primary/10 shadow-inner">
                <ol className="text-left list-decimal list-inside space-y-4">
                  {[
                    "Click our affiliate link to enroll in Digital BOSS Academy",
                    "Choose your preferred payment option",
                    "Get instant access to all three volumes and bonus materials"
                  ].map((step, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <div 
                        className="text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: step }}
                      />
                    </motion.li>
                  ))}
                </ol>
                
                <motion.div 
                  className="mt-5 text-sm bg-secondary/80 dark:bg-secondary/50 p-3 rounded-md border border-primary/5 flex items-start gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <AlertCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80">
                    As an affiliate, we earn a 60% commission when you sign up through our link. You'll receive the same price and benefits as going directly to the official site.
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="flex flex-col items-center gap-6">
              <Image
                src="/Me.jpg"
                alt="Digital BOSS Academy Representative"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20 shadow-lg"
                priority
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">Your Digital BOSS Guide</h3>
                <p className="text-sm text-foreground/70">Ready to help you get started</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <motion.div 
              className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 -z-10" 
              animate={{ 
                opacity: [0.4, 0.6, 0.4],
                scale: [0.98, 1, 0.98]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <Card className="overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg border border-primary/10 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="mb-6 p-4 bg-secondary/60 dark:bg-secondary/40 rounded-lg border border-primary/10 shadow-inner">
                  <div className="text-sm text-foreground/80 flex items-start gap-2">
                    <HelpCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="mb-2">
                        <span className="font-semibold text-primary">Questions about Digital BOSS Academy?</span> Fill out this form and we'll help guide you through the enrollment process.
                      </p>
                      <a
                        href="https://wa.me/447592224233"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#128C7E] transition-all group"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, -10, 10, 0]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <MessageSquare className="h-5 w-5" />
                        </motion.div>
                        <span className="font-medium group-hover:tracking-wide transition-all">Chat with us on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label 
                        htmlFor="name" 
                        className={cn(
                          "text-sm font-medium transition-colors",
                          focusedField === "name" ? "text-primary" : "text-foreground/70"
                        )}
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={cn(
                          "bg-background/50 dark:bg-secondary/30 transition-all duration-300",
                          focusedField === "name" 
                            ? "border-primary/60 shadow-[0_0_0_1px_rgba(var(--primary),0.3)]" 
                            : "border-primary/20 hover:border-primary/40"
                        )}
                        aria-label="Your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label 
                        htmlFor="email" 
                        className={cn(
                          "text-sm font-medium transition-colors",
                          focusedField === "email" ? "text-primary" : "text-foreground/70"
                        )}
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your-email@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={cn(
                          "bg-background/50 dark:bg-secondary/30 transition-all duration-300",
                          focusedField === "email" 
                            ? "border-primary/60 shadow-[0_0_0_1px_rgba(var(--primary),0.3)]" 
                            : "border-primary/20 hover:border-primary/40"
                        )}
                        aria-label="Your email address"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="message" 
                      className={cn(
                        "text-sm font-medium transition-colors",
                        focusedField === "message" ? "text-primary" : "text-foreground/70"
                      )}
                    >
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Any questions about the program? We're here to help!"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={cn(
                        "min-h-[120px] bg-background/50 dark:bg-secondary/30 transition-all duration-300 resize-y",
                        focusedField === "message" 
                          ? "border-primary/60 shadow-[0_0_0_1px_rgba(var(--primary),0.3)]" 
                          : "border-primary/20 hover:border-primary/40"
                      )}
                      aria-label="Your message"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            type="submit"
                            className={cn(
                              "w-full relative overflow-hidden group transition-all duration-300",
                              isSubmitting || submitStatus === "success"
                                ? "bg-primary text-primary-foreground"
                                : "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                            )}
                            disabled={isSubmitting || submitStatus === "success"}
                          >
                            <AnimatePresence mode="wait">
                              {isSubmitting ? (
                                <motion.div
                                  key="submitting"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center"
                                >
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Sending...
                                </motion.div>
                              ) : submitStatus === "success" ? (
                                <motion.div
                                  key="success"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Message Sent!
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="send"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center"
                                >
                                  Send Message
                                  <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="ml-2"
                                  >
                                    <Send className="h-4 w-4" />
                                  </motion.div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            <motion.div 
                              className="absolute bottom-0 left-0 h-1 bg-white/20"
                              initial={{ width: 0 }}
                              animate={isSubmitting ? { width: "100%" } : { width: 0 }}
                              transition={{ duration: 1.5 }}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-secondary/90 backdrop-blur-sm border-primary/20">
                          Send us your questions and we'll respond quickly!
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border-b border-primary/10 last:border-0"
                >
                  <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-4 transition-all">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 px-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground"
          >
            <span>Visit official website:</span>
            <a 
              href="https://www.digitalbossacademy.co" 
              className="text-primary hover:underline hover:text-primary/80 flex items-center gap-1 group transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Digital BOSS Academy website (opens in new tab)"
            >
              digitalbossacademy.co
              <motion.svg 
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </motion.svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}