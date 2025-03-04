import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
}

const Testimonial = ({ quote, name, title, avatarSrc }: TestimonialProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-none">
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-300 italic">"{quote}"</p>
          <div className="flex items-center gap-3 pt-4">
            <Avatar>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-400">{title}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function TestimonialComponent() {
  // This is just to ensure TypeScript recognizes this file as a module
  return null;
}

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I've tripled my passive income in just 6 months with AffiliateX. Their high-converting opportunities and amazing support make all the difference.",
      name: "Sarah Johnson",
      title: "Full-time Affiliate Marketer",
      avatarSrc: "/placeholder-user.jpg"
    },
    {
      quote: "The commission rates are unbeatable. I switched from three other affiliate programs and couldn't be happier with the results.",
      name: "Mark Peterson",
      title: "Digital Entrepreneur",
      avatarSrc: "/placeholder-user.jpg"
    },
    {
      quote: "What stands out is their analytics dashboard. Being able to track performance in real-time has helped me optimize my campaigns effectively.",
      name: "Priya Sharma",
      title: "Content Creator",
      avatarSrc: "/placeholder-user.jpg"
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Hear from our partners who have transformed their affiliate marketing journey with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              avatarSrc={testimonial.avatarSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}