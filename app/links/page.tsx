"use client"
import ProfileHeader from "@/components/linktree/profile-header"
import LinkGrid from "@/components/linktree/link-grid"
import MediaSection from "@/components/linktree/media-section"

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10 px-4 py-20 md:py-32">
      <div className="max-w-xl mx-auto backdrop-blur-xl bg-background/30 rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
        <ProfileHeader />
        <div className="mt-10">
          <LinkGrid />
        </div>
        <div className="mt-12">
          <MediaSection />
        </div>
      </div>
    </main>
  )
}

