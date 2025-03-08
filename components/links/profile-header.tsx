'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Award } from 'lucide-react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'
import { getStoredData, StoredProfile } from '@/lib/local-storage'

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const defaultProfile: StoredProfile = {
  username: 'Samuel Sehinde',
  title: 'Digital Marketer',
  bio: 'Samuel Sehinde is a dynamic digital marketer known for his innovative approach to boosting brand visibility and engagement across digital platforms. Leveraging expertise in social media, SEO, and content strategy, he transforms data-driven insights into captivating campaigns that consistently drive measurable success.',
  image: '/logoimage-removebg-preview.png'
}

export function ProfileHeader() {
  const [profile, setProfile] = useState(defaultProfile)

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getStoredData()
      if (data?.profile) {
        setProfile({
          ...defaultProfile,
          ...data.profile
        })
      }
    }
    loadProfile()
  }, [])

  const [text] = useTypewriter({
    words: [profile.bio],
    loop: 1,
  })

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <motion.div variants={item} className="text-center">
        <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
          <AvatarImage src={profile.image} alt={profile.username} />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
      </motion.div>

      <motion.div variants={item} className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">{profile.username}</h1>
        <div className="flex items-center justify-center gap-1 text-muted-foreground">
          <Award className="w-4 h-4" />
          <span>{profile.title}</span>
        </div>
        <ScrollArea className="h-24 w-full px-4">
          <p className="text-muted-foreground">
            {text}
            <Cursor cursorStyle="_" />
          </p>
        </ScrollArea>
      </motion.div>
    </motion.div>
  )
}