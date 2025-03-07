'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LinkItem } from './types'

interface EditLinkDialogProps {
  link: LinkItem
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (updatedLink: Partial<LinkItem>) => void
}

const LINK_TYPES = [
  { value: 'social', label: 'Social Media', icon: 'twitter' },
  { value: 'product', label: 'Product', icon: 'book' },
  { value: 'payment', label: 'Payment', icon: 'coffee' },
]

export default function EditLinkDialog({ link, open, onOpenChange, onUpdate }: EditLinkDialogProps) {
  const [formData, setFormData] = useState(link)

  useEffect(() => {
    setFormData(link)
  }, [link])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    onOpenChange(false)
  }

  const handleTypeChange = (value: string) => {
    const type = value as LinkItem['type']
    const icon = LINK_TYPES.find(t => t.value === type)?.icon || 'twitter'
    setFormData(prev => ({ ...prev, type, icon }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Link Type</Label>
            <Select
              value={formData.type}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select link type" />
              </SelectTrigger>
              <SelectContent>
                {LINK_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Follow me on Twitter"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}