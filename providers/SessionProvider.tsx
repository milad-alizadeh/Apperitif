import { Session } from '@supabase/supabase-js'
import { api } from '../services/api'
import React, { ReactNode, createContext, useEffect, useState } from 'react'

export const SessionContext = createContext<Session | null>(null)

interface SessionProviderProps {
  children: ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: subscription } = api.supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        // Clear the store when the user logs out
        await api.apolloClient.clearStore()
      } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        // Reset the store and refetch all active queries when the user logs in or updates
        await api.apolloClient.resetStore()
      }
    })

    // Cleanup subscription on component unmount
    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [api.supabase.auth, api.apolloClient])

  useEffect(() => {
    api.supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    api.supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}
