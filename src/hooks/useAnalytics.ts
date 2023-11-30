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
    console.log('screen', screenName, properties)
    posthog?.screen(screenName, properties)
  }

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    console.log('identify', distinctId, properties)
    posthog?.identify(distinctId, properties)
  }

  const reset = () => {
    console.log('reset')
    posthog?.reset()
  }

  return {
    capture,
    screen,
    identify,
    reset,
  }
}
