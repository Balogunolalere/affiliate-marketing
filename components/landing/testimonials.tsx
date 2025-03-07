"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
  result?: string;
}

const Testimonial = ({ quote, name, title, avatarSrc, result }: TestimonialProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg overflow-hidden h-full relative group">
      <CardContent className="p-6 relative">
        {result && (
          <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm">
            {result}
          </Badge>
        )}
        <div className="absolute top-3 left-3 text-primary/20 opacity-50 group-hover:opacity-80 transition-opacity">
          <Quote size={30} strokeWidth={1} />
        </div>
        <div className="space-y-4 relative">
          <div className="flex gap-0.5 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />
            ))}
          </div>
          <p className="text-foreground/80 italic pt-3">{quote}</p>
          <div className="flex items-center gap-3 pt-4 border-t border-primary/5">
            <Avatar className="border-2 border-primary/10">
              <AvatarImage src={avatarSrc} />
              <AvatarFallback className="bg-primary/20 text-primary">{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{name}</p>
              <p className="text-sm text-foreground/60">{title}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const testimonials = [
    {
      quote: "You have a new order for 1 item from Online Store. From LIVE, I need to get back ACTIVE!",
      name: "Michael T.",
      title: "Digital Marketing Newcomer",
      avatarSrc: "/placeholder-user.jpg",
      result: "First Day Success"
    },
    {
      quote: "First day of the August challenge I am going to bed with sales. All sales from my live.",
      name: "Sarah K.",
      title: "Content Creator",
      avatarSrc: "/placeholder-user.jpg",
      result: "Day One Success"
    },
    {
      quote: "Your sign is up. I've been using myself and using the strategies for my TikTok for about 2 weeks... Already seeing great results!",
      name: "David R.",
      title: "TikTok Entrepreneur",
      avatarSrc: "/placeholder-user.jpg",
      result: "2-Week Success"
    },
    {
      quote: "I'm reading through your 'Secret to Success.' I've been on TikTok for about 2 weeks now. I've done a few lives and made sales. I'm excited to see how this goes. I definitely see a lot more sales coming on a live after reading this script!",
      name: "Jennifer M.",
      title: "Digital Product Seller",
      avatarSrc: "/placeholder-user.jpg",
      result: "Success with The Script"
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-16 relative overflow-hidden bg-gradient-to-br from-background to-accent/5"
      ref={ref}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10 pointer-events-none opacity-60" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-lg bg-secondary/80 px-3 py-1.5 text-sm text-primary font-medium border border-primary/10 shadow-sm mb-4"
          >
            Success Stories
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Real Results from Digital BOSS Academy Members
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/70 max-w-2xl mx-auto"
          >
            See what our community members have achieved using the strategies and resources from Digital BOSS Academy. These are real results from people just like you who implemented the training.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-1/4 right-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl -z-10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-1/3 left-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-accent/5 to-primary/10 blur-3xl -z-10"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Testimonial 
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                avatarSrc={testimonial.avatarSrc}
                result={testimonial.result}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 text-center"
        >
          <div className="inline-block p-4 rounded-lg bg-secondary/50 border border-primary/10 shadow-inner max-w-2xl mx-auto">
            <p className="text-foreground/70 text-sm">
              <span className="text-primary font-medium">Note:</span> Results vary based on individual effort, experience, and market conditions. These testimonials represent the experiences of specific members who have implemented the strategies taught in the program.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}