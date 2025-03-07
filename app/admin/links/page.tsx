import { Metadata } from 'next'
import AdminLinkManager from '@/components/admin/links/admin-link-manager'

export const metadata: Metadata = {
  title: 'Admin | Links Manager',
  description: 'Manage your link page content',
}

export default function AdminLinksPage() {
  return (
    <main className="container max-w-5xl px-4 pt-24 pb-8 mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Links Manager</h1>
          <p className="text-muted-foreground">Manage your profile and links</p>
        </div>
      </div>
      <AdminLinkManager />
    </main>
  )
}