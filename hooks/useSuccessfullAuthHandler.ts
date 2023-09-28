import { useNavigation } from '@react-navigation/native'

export const useSuccessfullAuthHandler = (attemptedRoute) => {
  const navigation = useNavigation()

  const handleSuccessfulAuth = () => {
    if (attemptedRoute) {
      navigation.navigate(attemptedRoute)
    } else {
      navigation.navigate('BrowseHome')
    }
  }

  return {
    handleSuccessfulAuth,
  }
}
