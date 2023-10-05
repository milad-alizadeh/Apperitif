import { useContext } from 'react'
import { SessionContext } from '../providers/SessionProvider'

export const useSession = () => {
  const session = useContext(SessionContext)
  if (session === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }

  return { isLoggedIn: !!session, user: session?.user }
}
