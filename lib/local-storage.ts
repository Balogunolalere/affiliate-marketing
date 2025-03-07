import { LinkItem } from '@/components/admin/links/types'

export interface StoredProfile {
  username: string
  title: string
  bio: string
  image: string
}

export interface StoredData {
  profile: StoredProfile
  links: any[]
}

export const STORAGE_KEY = 'affiliate-marketing-data'

export async function getStoredData(): Promise<StoredData | null> {
  if (typeof window === 'undefined') return null
  
  try {
    // First check if we have fresh data in localStorage to avoid unnecessary API calls
    const stored = localStorage.getItem('affiliate-marketing-data')
    if (stored) {
      return JSON.parse(stored)
    }

    // If no localStorage data, fetch from our JSON files via API
    const response = await fetch('/api/data')
    const apiData = await response.json()
    
    if (apiData.profiles?.length > 0) {
      const profile = apiData.profiles[0] // Assuming single profile for now
      const data = {
        profile: {
          username: profile.username,
          title: profile.title || '',
          bio: profile.bio || '',
          image: profile.image || '/placeholder-user.jpg'
        },
        links: apiData.links || []
      }
      
      // Cache the data in localStorage
      localStorage.setItem('affiliate-marketing-data', JSON.stringify(data))
      return data
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
  
  return null
}

export async function setStoredData(data: StoredData): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    // First save to JSON files via API
    const profile = {
      id: '1', // Assuming single profile for now
      username: data.profile.username,
      title: data.profile.title,
      bio: data.profile.bio,
      image: data.profile.image
    }

    const links = data.links.map((link, index) => ({
      ...link,
      profileId: '1',
      order: index
    }))

    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profiles: [profile],
        links
      })
    })

    // Then update localStorage
    localStorage.setItem('affiliate-marketing-data', JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save data:', error)
    // If API save fails, still update localStorage as a temporary cache
    localStorage.setItem('affiliate-marketing-data', JSON.stringify(data))
  }
}