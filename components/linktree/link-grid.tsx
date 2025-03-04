"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {
  ShoppingBag,
  BookOpen,
  CreditCard,
  Youtube,
  Instagram,
  Twitter,
  Twitch,
  DollarSign,
  ArrowUpRight,
} from "lucide-react"
import type { ReactElement } from 'react'

interface Link {
  id: string
  title: string
  url: string
  type: string
  color: string
  badge?: string
  icon: ReactElement
}

interface LinkCardProps {
  link: Link
  index: number
  moveLink: (dragIndex: number, hoverIndex: number) => void
}

const LinkCard = ({ link, index, moveLink }: LinkCardProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "LINK",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (cardRef.current) {
      drag(cardRef.current)
    }
  }, [drag])
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden shadow-lg hover:shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${link.color}15, transparent)`,
          borderColor: `${link.color}25`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
        
        <div className="flex items-center gap-4 z-10">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${link.color}, ${link.color}dd)`,
              boxShadow: `0 4px 12px ${link.color}33`
            }}
          >
            {link.icon}
          </div>
          <div>
            <h3 className="font-medium text-foreground/90 text-sm md:text-base">{link.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-3 z-10">
          {link.badge && (
            <span 
              className="text-xs px-2.5 py-1 rounded-full text-white font-medium"
              style={{
                background: `linear-gradient(135deg, ${link.color}, ${link.color}dd)`,
              }}
            >
              {link.badge}
            </span>
          )}
          <ArrowUpRight className="h-4 w-4 text-foreground/70 group-hover:translate-x-0.5 group-hover:translate-y-[-2px] transition-transform" />
        </div>
      </a>
    </motion.div>
  )
}

export default function LinkGrid() {
  const [links, setLinks] = useState<Link[]>([
    {
      id: "1",
      title: "Digital Marketing Course",
      url: "#",
      icon: <BookOpen className="h-4 w-4" />,
      type: "opportunity",
      color: "#0ea5e9",
      badge: "50% OFF",
    },
    {
      id: "2",
      title: "Affiliate Program",
      url: "#",
      icon: <DollarSign className="h-4 w-4" />,
      type: "opportunity",
      color: "#8b5cf6",
    },
    {
      id: "3",
      title: "Follow me on Twitter",
      url: "#",
      icon: <Twitter className="h-4 w-4" />,
      type: "social",
      color: "#1da1f2",
    },
    {
      id: "4",
      title: "Instagram Profile",
      url: "#",
      icon: <Instagram className="h-4 w-4" />,
      type: "social",
      color: "#e1306c",
    },
    {
      id: "5",
      title: "YouTube Channel",
      url: "#",
      icon: <Youtube className="h-4 w-4" />,
      type: "social",
      color: "#ff0000",
    },
    {
      id: "6",
      title: "Support My Work",
      url: "#",
      icon: <DollarSign className="h-4 w-4" />,
      type: "payment",
      color: "#10b981",
    },
    {
      id: "7",
      title: "Twitch Streams",
      url: "#",
      icon: <Twitch className="h-4 w-4" />,
      type: "social",
      color: "#9146ff",
    },
    {
      id: "8",
      title: "Exclusive Membership",
      url: "#",
      icon: <CreditCard className="h-4 w-4" />,
      type: "payment",
      color: "#f59e0b",
    },
  ])

  const moveLink = (dragIndex: number, hoverIndex: number) => {
    const draggedLink = links[dragIndex]
    const newLinks = [...links]
    newLinks.splice(dragIndex, 1)
    newLinks.splice(hoverIndex, 0, draggedLink)
    setLinks(newLinks)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1 mb-2">
        <h2 className="text-sm font-medium text-white/60">MY LINKS</h2>
      </div>
      
      <DndProvider backend={HTML5Backend}>
        <div className="grid gap-3">
          {links.map((link, index) => (
            <LinkCard key={link.id} link={link} index={index} moveLink={moveLink} />
          ))}
        </div>
      </DndProvider>
    </div>
  )
}

