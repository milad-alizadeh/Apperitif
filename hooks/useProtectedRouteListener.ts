import { EventArg } from '@react-navigation/native'
import { router } from 'expo-router'
import { useSession } from '../hooks/useSession'

export const useProtectedListener = () => {
  const { isLoggedIn } = useSession()

  const protectedRoute = ({ navigation, route }) => ({
    tabPress: (e: EventArg<'tabPress', true, undefined>) => {
      if (!isLoggedIn) {
        e.preventDefault()
        // If user is not logged in, navigate to Auth screen
        router.push({
          pathname: '/auth',
          params: { attemptedRoute: route.name },
        })
      }
    },
  })

  return { protectedRoute }
}
