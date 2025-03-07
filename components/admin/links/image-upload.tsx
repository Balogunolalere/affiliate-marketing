'use client'

import { useCallback, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Camera, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  currentImage: string
  onImageUpload: (imagePath: string) => void
}

export default function ImageUpload({ currentImage, onImageUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file."
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB."
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onImageUpload(data.path)
      
      toast({
        title: "Image uploaded",
        description: "Your profile image has been updated successfully."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again."
      })
    } finally {
      setIsUploading(false)
    }
  }, [onImageUpload, toast])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="relative w-24 h-24 p-0 border-2 border-dashed rounded-full hover:opacity-90"
        >
          <Avatar className="w-full h-full">
            <AvatarImage src={currentImage} alt="Profile" className="object-cover" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={currentImage} alt="Profile Preview" className="object-cover" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="relative"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Choose Image
                </>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}