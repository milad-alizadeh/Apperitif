import { EventArg } from '@react-navigation/native'
import { useSession } from '../hooks/useSession'

export const useProtectedListener = () => {
  const { isLoggedIn } = useSession()

  const protectedRoute = ({ navigation, route }) => ({
    tabPress: (e: EventArg<'tabPress', true, undefined>) => {
      if (!isLoggedIn) {
        e.preventDefault()
        console.log('User is not logged in', route.name)
        // If user is not logged in, navigate to Auth screen
        navigation.navigate('AuthNavigator', {
          screen: 'AuthHome',
          params: { attemptedRoute: route.name },
        })
      }
    },
  })

  return { protectedRoute }
}
