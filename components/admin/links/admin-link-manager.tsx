'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileManager from './profile-manager'
import LinksManager from './links-manager'
import PreviewSection from './preview-section'
import { AdminProvider } from './context'

export default function AdminLinkManager() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <AdminProvider>
      <div className="space-y-6">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>
          <div className="mt-6 grid gap-6 md:grid-cols-5">
            <div className="space-y-6 md:col-span-3">
              <TabsContent value="profile" className="m-0">
                <ProfileManager />
              </TabsContent>
              <TabsContent value="links" className="m-0">
                <LinksManager />
              </TabsContent>
            </div>
            <div className="md:col-span-2">
              <PreviewSection activeTab={activeTab} />
            </div>
          </div>
        </Tabs>
      </div>
    </AdminProvider>
  )
}