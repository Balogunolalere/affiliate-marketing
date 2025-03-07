'use client'

import { useState } from 'react'
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import SortableLink from './sortable-link'
import AddLinkDialog from './add-link-dialog'
import { useToast } from '@/components/ui/use-toast'
import { LinkItem } from './types'
import { useAdmin } from './context'

export default function LinksManager() {
  const { links, updateLinks } = useAdmin()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = links.findIndex((item) => item.id === active.id)
      const newIndex = links.findIndex((item) => item.id === over.id)
      
      updateLinks(arrayMove(links, oldIndex, newIndex))
    }
  }

  const handleAddLink = (newLink: Omit<LinkItem, 'id'>) => {
    const id = (links.length + 1).toString()
    updateLinks([...links, { ...newLink, id }])
    setIsAddDialogOpen(false)
    toast({
      title: "Link added",
      description: "Your new link has been added successfully."
    })
  }

  const handleUpdateLink = (id: string, updatedLink: Partial<LinkItem>) => {
    updateLinks(
      links.map(link =>
        link.id === id ? { ...link, ...updatedLink } : link
      )
    )
    toast({
      title: "Link updated",
      description: "Your link has been updated successfully."
    })
  }

  const handleDeleteLink = (id: string) => {
    updateLinks(links.filter(link => link.id !== id))
    toast({
      title: "Link deleted",
      description: "Your link has been deleted successfully."
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Manage Links</CardTitle>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Add Link
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={links.map(link => link.id)}
              strategy={verticalListSortingStrategy}
            >
              {links.map((link) => (
                <SortableLink
                  key={link.id}
                  link={link}
                  onUpdate={(updatedLink) => handleUpdateLink(link.id, updatedLink)}
                  onDelete={() => handleDeleteLink(link.id)}
                />
              ))}
            </SortableContext>
          </DndContext>

          {links.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No links yet. Add your first link to get started.
            </div>
          )}
        </div>
      </CardContent>

      <AddLinkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddLink}
      />
    </Card>
  )
}