'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { useAdmin } from './context'

interface PreviewSectionProps {
  activeTab: string
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

export default function PreviewSection({ activeTab }: PreviewSectionProps) {
  const [text] = useTypewriter({
    words: ['Digital Creator', 'Content Producer', 'Affiliate Marketer'],
    loop: true,
    delaySpeed: 2000,
  })

  const { profile, links } = useAdmin()

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-y-auto max-h-[600px] rounded-lg bg-gradient-to-br from-background via-background to-accent/10 p-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Profile Preview */}
            <motion.div variants={item} className="text-center space-y-4">
              <div className="relative mx-auto w-24 h-24">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.image} alt="Profile" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{profile.username}</h2>
                <p className="text-muted-foreground h-6">
                  {text}
                  <Cursor cursorStyle="_" />
                </p>
              </div>
            </motion.div>

            {/* Links Preview */}
            <motion.div variants={item} className="space-y-3">
              {links.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-card hover:shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.title}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}