import { router } from 'expo-router'

export const useSuccessfullAuthHandler = (attemptedRoute: any) => {
  const handleSuccessfulAuth = () => {
    if (attemptedRoute) {
      router.push(attemptedRoute)
    } else {
      router.push('/browse')
    }
  }
  return {
    handleSuccessfulAuth,
  }
}
