'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ImageUpload from './image-upload'
import { useToast } from '@/components/ui/use-toast'
import { Upload, Loader2 } from 'lucide-react'
import { useAdmin } from './context'

export default function ProfileManager() {
  const [isLoading, setIsLoading] = useState(false)
  const { profile, updateProfile } = useAdmin()
  const { toast } = useToast()

  const handleImageUpload = useCallback(async (imagePath: string) => {
    updateProfile({ image: imagePath })
  }, [updateProfile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Save is handled by context which syncs with both local storage and JSON store
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast({
        title: "Profile updated",
        description: "Your profile changes have been saved successfully."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <ImageUpload 
                currentImage={profile.image || '/placeholder-user.jpg'} 
                onImageUpload={handleImageUpload}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={e => updateProfile({ username: e.target.value })}
                placeholder="@username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title/Role</Label>
              <Input
                id="title"
                value={profile.title}
                onChange={e => updateProfile({ title: e.target.value })}
                placeholder="e.g. Digital Creator"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={e => updateProfile({ bio: e.target.value })}
                placeholder="Tell visitors about yourself..."
                rows={3}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}