"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface SettingsFormValues {
  username: string
  emailNotifications: boolean
  showStats: boolean
  enableDarkMode: boolean
}

export default function SettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      username: "",
      emailNotifications: true,
      showStats: true,
      enableDarkMode: false,
    },
  })

  function onSubmit(data: SettingsFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Settings updated",
        description: "Your settings have been updated successfully.",
      })
      console.log(data)
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Account Preferences */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Account Preferences</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-foreground">Username</FormLabel>
                    <FormDescription className="text-foreground/70">
                      This is your unique profile URL.
                    </FormDescription>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground/70">affiliatex.com/</span>
                      <FormControl>
                        <Input {...field} className="bg-background border-primary/20" />
                      </FormControl>
                    </div>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-xl border border-primary/20 p-4 hover:border-primary/50 transition-colors">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base text-foreground">Email Notifications</FormLabel>
                      <FormDescription className="text-foreground/70">
                        Receive updates about your account activity.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Display Settings */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Display Settings</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="showStats"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-xl border border-primary/20 p-4 hover:border-primary/50 transition-colors">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base text-foreground">Show Profile Stats</FormLabel>
                      <FormDescription className="text-foreground/70">
                        Display follower count and other statistics on your profile.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableDarkMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-xl border border-primary/20 p-4 hover:border-primary/50 transition-colors">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base text-foreground">Enable Dark Mode</FormLabel>
                      <FormDescription className="text-foreground/70">
                        Allow visitors to switch between light and dark mode.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
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

