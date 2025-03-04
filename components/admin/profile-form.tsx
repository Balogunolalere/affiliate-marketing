"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const profileFormSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  twitter: z.string().max(50).optional(),
  instagram: z.string().max(50).optional(),
  youtube: z.string().max(100).optional(),
  website: z.string().url().optional(),
})

interface ProfileFormValues extends z.infer<typeof profileFormSchema> {}

export default function ProfileForm() {
  const [avatar, setAvatar] = useState<string | null>("/placeholder.svg?height=128&width=128")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      twitter: "",
      instagram: "",
      youtube: "",
      website: "",
    },
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      console.log(data)
    }, 1500)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatar(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAvatar = () => {
    setAvatar("/placeholder.svg?height=128&width=128")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Basic Information</h3>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:opacity-90"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">Profile Photo</h4>
                  <p className="text-sm text-foreground/70">
                    Upload a photo to make your profile more personable.
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background border-primary/20" />
                    </FormControl>
                    <FormDescription className="text-foreground/70">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-background border-primary/20 min-h-[100px]" />
                    </FormControl>
                    <FormDescription className="text-foreground/70">
                      Write a short bio about yourself.
                    </FormDescription>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Social Links</h3>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Twitter</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background border-primary/20" placeholder="@username" />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Instagram</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background border-primary/20" placeholder="username" />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">YouTube</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background border-primary/20" placeholder="Channel name" />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Website</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background border-primary/20" placeholder="https://yourwebsite.com" />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
      <Toaster />
    </Form>
  )
}

