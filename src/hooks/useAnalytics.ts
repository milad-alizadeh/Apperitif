import { isDevice } from 'expo-device'
import { usePostHog } from 'posthog-react-native'

export const useAnalytics = () => {
  if (!isDevice) {
    return {
      capture: () => {},
      screen: () => {},
    }
  }

  const posthog = usePostHog()

  const capture = (event: string, properties?: Record<string, any>) => {
    console.log('capture', event, properties)
    posthog?.capture(event, properties)
  }

  const screen = (screenName: string, properties?: Record<string, any>) => {
    console.log('screenName', screenName, properties)
    posthog?.screen(screenName, properties)
  }

  return {
    capture,
    screen,
  }
}
