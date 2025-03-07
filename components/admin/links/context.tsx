'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { LinkItem } from './types'
import { getStoredData, setStoredData, StoredData } from '@/lib/local-storage'

interface Link {
  id: string
  title: string
  url: string
  image?: string
  profileId: string
  order: number
}

interface AdminState {
  profile: {
    username: string
    title: string
    bio: string
    image: string
  }
  links: LinkItem[]
  updateProfile: (profile: Partial<AdminState['profile']>) => void
  updateLinks: (links: LinkItem[]) => void
}

const initialState: Omit<AdminState, 'updateProfile' | 'updateLinks'> = {
  profile: {
    username: '@username',
    title: 'Digital Creator',
    bio: 'Creating content and sharing knowledge',
    image: '/placeholder-user.jpg'
  },
  links: []
}

const AdminContext = createContext<AdminState | null>(null)

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState)

  // Load stored data on mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedData = await getStoredData()
        if (storedData) {
          setState(prev => ({
            ...prev,
            profile: storedData.profile,
            links: storedData.links.map((link: any) => ({
              ...link,
              type: 'link',
              icon: 'link'
            } as LinkItem))
          }))
        }
      } catch (error) {
        console.error('Failed to load stored data:', error)
      }
    }
    
    loadStoredData()
  }, [])

  const updateProfile = (profile: Partial<AdminState['profile']>) => {
    setState(prev => {
      const newState = {
        ...prev,
        profile: { ...prev.profile, ...profile }
      }
      // Save to both local storage and JSON store
      setStoredData({
        profile: newState.profile,
        links: newState.links.map(convertToStorageLink)
      })
      return newState
    })
  }

  const updateLinks = (links: LinkItem[]) => {
    setState(prev => {
      const newState = { ...prev, links }
      // Save to both local storage and JSON store
      setStoredData({
        profile: newState.profile,
        links: links.map(convertToStorageLink)
      })
      return newState
    })
  }

  // Helper function to convert LinkItem to storage Link type
  const convertToStorageLink = (link: LinkItem): Link => ({
    id: link.id,
    title: link.title,
    url: link.url,
    image: link.image,
    profileId: link.profileId || '1',
    order: link.order || 0
  })

  return (
    <AdminContext.Provider value={{ ...state, updateProfile, updateLinks }}>
      {children}
    </AdminContext.Provider>
  )
}