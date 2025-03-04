"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductProps {
  title: string;
  description: string;
  commission: string;
  conversionRate: string;
  category: string;
  popular?: boolean;
}

const Product = ({ title, description, commission, conversionRate, category, popular }: ProductProps) => {
  return (
    <Card className={`h-full ${popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-800'}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {popular && <Badge className="bg-blue-500">Popular</Badge>}
        </div>
        <Badge variant="outline" className="mt-1 text-xs">
          {category}
        </Badge>
      </CardHeader>
      <CardContent className="text-gray-400 text-sm">
        <p className="mb-6">{description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Commission</p>
            <p className="text-lg font-bold text-green-500">{commission}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Avg. Conversion</p>
            <p className="text-lg font-bold">{conversionRate}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Promote This Product</Button>
      </CardFooter>
    </Card>
  );
};

export default function Opportunities() {
  const opportunities = [
    {
      title: "Digital Marketing Mastery",
      description: "Premium course teaching advanced strategies for digital marketing success.",
      commission: "40%",
      conversionRate: "5.8%",
      category: "Education",
      popular: true,
    },
    {
      title: "EcoLife Wellness Pack",
      description: "Organic health supplements with recurring subscription model.",
      commission: "25%",
      conversionRate: "4.2%",
      category: "Health & Wellness",
    },
    {
      title: "InvestSmart Pro",
      description: "Investment tools and analytics platform with premium subscription.",
      commission: "30%",
      conversionRate: "3.7%",
      category: "Finance",
    },
    {
      title: "HomeOffice Premium Bundle",
      description: "Everything needed for the perfect home office setup. One-time purchase.",
      commission: "15%",
      conversionRate: "6.1%",
      category: "Lifestyle",
      popular: true,
    },
    {
      title: "TechGuru Membership",
      description: "Monthly tech support and tutorials for all devices and platforms.",
      commission: "20%",
      conversionRate: "4.5%",
      category: "Technology",
    },
    {
      title: "FitLife Pro Subscription",
      description: "Complete fitness program with custom meal plans and workout routines.",
      commission: "35%",
      conversionRate: "5.2%",
      category: "Fitness",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Opportunities</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore these high-performing opportunities and maximize your commission with our industry-leading rates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <Product 
              key={index}
              title={opportunity.title}
              description={opportunity.description}
              commission={opportunity.commission}
              conversionRate={opportunity.conversionRate}
              category={opportunity.category}
              popular={opportunity.popular}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Browse All Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}

