"use client"

import * as React from "react"
import { useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingBag,
  BookOpen,
  CreditCard,
  Youtube,
  Instagram,
  Twitter,
  Twitch,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  GripVertical,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface LinkItem {
  id: number
  title: string
  url: string
  icon: React.ReactElement
  type: "social" | "product" | "payment"
  color: string
  badge?: string
}

interface LinkCardProps {
  link: LinkItem
  index: number
  moveLink: (dragIndex: number, hoverIndex: number) => void
  onEdit: (link: LinkItem) => void
  onDelete: (id: number) => void
}

const LinkCard = React.forwardRef<HTMLDivElement, LinkCardProps>(({ link, moveLink, ...props }, ref) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'LINK',
    item: { id: link.id, index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // Combine refs if needed
  const dragRef = (el: HTMLDivElement | null) => {
    if (ref) {
      // Handle forwardRef
      if (typeof ref === 'function') {
        ref(el)
      } else {
        ref.current = el
      }
    }
    drag(el)
  }

  return (
    <motion.div
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="relative"
    >
      <div className="flex items-center p-4 bg-background/95 rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all">
        <div ref={dragRef} className="mr-3 cursor-grab active:cursor-grabbing text-foreground/40 hover:text-foreground/60">
          <GripVertical className="h-5 w-5" />
        </div>
        
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground mr-4"
          style={{ 
            background: `linear-gradient(135deg, ${link.color}, ${link.color}dd)`,
            boxShadow: `0 2px 10px ${link.color}33`
          }}
        >
          {link.icon}
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-foreground">{link.title}</h3>
          <p className="text-xs text-foreground/70 truncate">{link.url}</p>
        </div>

        {link.badge && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium mr-4">
            {link.badge}
          </span>
        )}

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-primary hover:bg-accent/50"
            onClick={() => props.onEdit(link)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-destructive hover:bg-destructive/10"
            onClick={() => props.onDelete(link.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
})
LinkCard.displayName = "LinkCard"

export default function LinksManager() {
  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: 1,
      title: "Premium Marketing Course",
      url: "https://example.com/course",
      icon: <BookOpen className="h-5 w-5" />,
      type: "product",
      color: "#0ea5e9",
      badge: "50% OFF",
    },
    {
      id: 2,
      title: "Smart Home Starter Kit",
      url: "https://example.com/smarthome",
      icon: <ShoppingBag className="h-5 w-5" />,
      type: "product",
      color: "#8b5cf6",
    },
    {
      id: 3,
      title: "Follow me on Twitter",
      url: "https://twitter.com/username",
      icon: <Twitter className="h-5 w-5" />,
      type: "social",
      color: "#1da1f2",
    },
    {
      id: 4,
      title: "Instagram Profile",
      url: "https://instagram.com/username",
      icon: <Instagram className="h-5 w-5" />,
      type: "social",
      color: "#e1306c",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    type: "social",
    color: "#1da1f2",
    badge: "",
  })

  const iconMap: Record<string, React.ReactElement> = {
    twitter: <Twitter className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    twitch: <Twitch className="h-5 w-5" />,
    product: <ShoppingBag className="h-5 w-5" />,
    course: <BookOpen className="h-5 w-5" />,
    payment: <DollarSign className="h-5 w-5" />,
    membership: <CreditCard className="h-5 w-5" />,
  }

  const moveLink = (dragIndex: number, hoverIndex: number) => {
    const draggedLink = links[dragIndex]
    const newLinks = [...links]
    newLinks.splice(dragIndex, 1)
    newLinks.splice(hoverIndex, 0, draggedLink)
    setLinks(newLinks)
  }

  const handleEdit = (link: LinkItem) => {
    setEditingLink(link)
    setFormData({
      title: link.title,
      url: link.url,
      type: link.type,
      color: link.color,
      badge: link.badge || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
    toast({
      title: "Link deleted",
      description: "The link has been deleted successfully.",
    })
  }

  const handleAddNew = () => {
    setEditingLink(null)
    setFormData({
      title: "",
      url: "",
      type: "social",
      color: "#1da1f2",
      badge: "",
    })
    setIsDialogOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as "social" | "product" | "payment" }))
  }

  const handleIconChange = (value: string) => {
    // This would update the icon in a real implementation
    console.log("Icon changed to:", value)
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.url) {
      toast({
        title: "Error",
        description: "Title and URL are required.",
        variant: "destructive",
      })
      return
    }

    if (editingLink) {
      // Update existing link
      setLinks(
        links.map((link) =>
          link.id === editingLink.id
            ? {
                ...link,
                title: formData.title,
                url: formData.url,
                type: formData.type as "social" | "product" | "payment",
                color: formData.color,
                badge: formData.badge || undefined,
              }
            : link,
        ),
      )

      toast({
        title: "Link updated",
        description: "The link has been updated successfully.",
      })
    } else {
      // Add new link
      const newLink: LinkItem = {
        id: Date.now(),
        title: formData.title,
        url: formData.url,
        icon: iconMap[formData.type === "social" ? "twitter" : formData.type === "product" ? "product" : "payment"],
        type: formData.type as "social" | "product" | "payment",
        color: formData.color,
        badge: formData.badge || undefined,
      }

      setLinks([...links, newLink])

      toast({
        title: "Link added",
        description: "The new link has been added successfully.",
      })
    }

    setIsDialogOpen(false)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground">Manage Links</h2>
          <Button 
            onClick={handleAddNew}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Link
          </Button>
        </div>

        <div className="space-y-2">
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              index={index}
              link={link}
              onEdit={handleEdit}
              onDelete={handleDelete}
              moveLink={moveLink}
            />
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 border border-primary/10">
          <DialogHeader>
            <DialogTitle className="text-foreground">{editingLink ? "Edit Link" : "Add New Link"}</DialogTitle>
            <DialogDescription className="text-foreground/70">
              {editingLink ? "Update your link details below." : "Fill in the details for your new link."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-foreground">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter link title"
                className="bg-background border-primary/20"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url" className="text-foreground">URL</Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleFormChange}
                placeholder="https://example.com"
                className="bg-background border-primary/20"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type" className="text-foreground">Link Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger id="type" className="bg-background border-primary/20">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-foreground">Color</Label>
              <div className="flex gap-3">
                <Input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleFormChange}
                  className="w-12 h-10 p-1 bg-background border-primary/20"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="badge" className="text-foreground">
                Badge Text <span className="text-foreground/60 text-xs">(Optional)</span>
              </Label>
              <Input
                id="badge"
                name="badge"
                value={formData.badge}
                onChange={handleFormChange}
                placeholder="e.g. NEW or 50% OFF"
                className="bg-background border-primary/20"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-primary/20 hover:bg-accent/50 hover:text-primary"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              {editingLink ? "Save Changes" : "Add Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </DndProvider>
  )
}

