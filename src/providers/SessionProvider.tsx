import { Session } from '@supabase/supabase-js'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import { api } from '../services/api'

export const SessionContext = createContext<Session | null>(null)

interface SessionProviderProps {
  children: ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const { capture, identify, loaded } = useAnalytics()

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
    if (!loaded) return
    api.supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        identify(session?.user?.id, {
          provider: session?.user?.app_metadata?.provider,
        })
      }
      setSession(session)
    })

    api.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        capture('auth:log_in_success', { provider: session?.user?.app_metadata?.provider })
        identify(session?.user?.id, {
          provider: session?.user?.app_metadata?.provider,
        })
      }

      setSession(session)
    })
  }, [loaded])

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}
