'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LinkItem } from './types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Twitter, Book, Coffee, GripVertical, Pencil, Trash2, Link, Instagram, Facebook, Youtube, Github, Linkedin, Globe, ShoppingCart, Mail, Phone, MessageCircle, Video, Music, Image, File, Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import EditLinkDialog from './edit-link-dialog'

interface SortableLinkProps {
  link: LinkItem
  onUpdate: (updatedLink: Partial<LinkItem>) => void
  onDelete: () => void
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

export default function SortableLink({ link, onUpdate, onDelete }: SortableLinkProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Icon = iconMap[link.icon as keyof typeof iconMap] || Link; // Provide Link as fallback

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          "relative flex items-center gap-4 p-3 hover:shadow-md transition-shadow",
          isDragging && "shadow-lg ring-1 ring-primary"
        )}
      >
        <div
          {...attributes}
          {...listeners}
          className="p-2 cursor-grab active:cursor-grabbing hover:bg-accent rounded-md transition-colors"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex-1 flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-full bg-primary/10">
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{link.title}</p>
            <p className="text-sm text-muted-foreground truncate">{link.url}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil className="w-4 h-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this link. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete()
                setIsDeleteDialogOpen(false)
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditLinkDialog
        link={link}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
      />
    </>
  )
}