'use client'

import { useState } from 'react'
import { LinkCard } from '@/components/links/link-card'
import { motion } from 'framer-motion'
import { defaultLinks } from '@/lib/default-data'
import { Facebook, Instagram } from 'lucide-react'

interface ProcessedLink {
  id: string
  type: string
  title: string
  url: string
  icon: string
  [key: string]: any
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function LinkGrid() {
  const [links] = useState<ProcessedLink[]>(defaultLinks)

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4"
    >
      {links.map((link) => (
        <motion.div key={link.id} variants={item}>
          <LinkCard link={link}>
            {getSocialIcon(link.icon)}
          </LinkCard>
        </motion.div>
      ))}
    </motion.div>
  )
}