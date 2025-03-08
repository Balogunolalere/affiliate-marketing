import { Metadata } from 'next'
import { ProfileHeader } from '@/components/links/profile-header'
import { LinkGrid } from '@/components/links/link-grid'

export const metadata: Metadata = {
  title: 'Links | Digital BOSS Academy',
  description: 'Connect with Digital BOSS Academy across all platforms',
}

export default async function LinksPage() {
  return (
    <main className="container max-w-3xl px-4 pt-16 pb-6 mx-auto space-y-8">
      <ProfileHeader />
      <LinkGrid />
    </main>
  )
}