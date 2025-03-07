'use client'

import { useState, useEffect } from 'react'
import { LinkCard } from '@/components/links/link-card'
import { motion } from 'framer-motion'
import { getStoredData } from '@/lib/local-storage'
import { LinkItem } from '../admin/links/types'

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
  const [links, setLinks] = useState<ProcessedLink[]>([])

  useEffect(() => {
    const loadLinks = async () => {
      const data = await getStoredData()
      if (data?.links) {
        const processedLinks: ProcessedLink[] = data.links.map((link: any) => ({
          ...link,
          type: link.type || 'social',
          icon: link.icon || 'link'
        }))
        setLinks(processedLinks)
      }
    }
    loadLinks()

    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key === 'affiliate-marketing-data') {
        const newData = e.newValue ? JSON.parse(e.newValue) : null
        if (newData?.links) {
          const processedLinks: ProcessedLink[] = newData.links.map((link: any) => ({
            ...link,
            type: link.type || 'social',
            icon: link.icon || 'link'
          }))
          setLinks(processedLinks)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4"
    >
      {links.map((link) => (
        <motion.div key={link.id} variants={item}>
          <LinkCard link={link} />
        </motion.div>
      ))}
    </motion.div>
  )
}