'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Twitter, Book, Coffee, GripVertical, Link, Instagram, Facebook, Youtube, Github, Linkedin, Globe, ShoppingCart, Mail, Phone, MessageCircle, Video, Music, Image, File, Download, ExternalLink, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LinkCardProps {
  link: {
    id: string
    type: string
    title: string
    url: string
    icon: string
  }
  children?: React.ReactNode
}

const iconMap = {
  twitter: Twitter,
  book: Book,
  coffee: Coffee,
  link: Link,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
  globe: Globe,
  shopping: ShoppingCart,
  mail: Mail,
  phone: Phone,
  message: MessageCircle,
  video: Video,
  music: Music,
  image: Image,
  file: File,
  download: Download,
  external: ExternalLink
}

export function LinkCard({ link, children }: LinkCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Icon = children ? () => <>{children}</> : (iconMap[link.icon as keyof typeof iconMap] || Link)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={style}
    >
      <motion.a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          ref={setNodeRef}
          className={cn(
            "relative group cursor-pointer overflow-hidden",
            "before:absolute before:inset-0 before:z-0",
            "before:bg-gradient-to-r before:from-primary/20 before:to-primary/40",
            "before:translate-x-[-100%] hover:before:translate-x-0",
            "before:transition before:duration-500"
          )}
        >
          <div className="relative z-10 flex items-center gap-4 p-4">
            <div
              {...attributes}
              {...listeners}
              className="touch-none cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-5 h-5 text-muted-foreground" />
            </div>
            
            <div className="flex-1 flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{link.title}</span>
            </div>

            <motion.div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.a>
    </motion.div>
  )
}