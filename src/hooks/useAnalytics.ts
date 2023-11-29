import { usePostHog } from 'posthog-react-native'

export const useAnalytics = () => {
  const posthog = usePostHog()

  const capture = (event: string, properties?: Record<string, any>) => {
    posthog?.capture(event, properties)
  }

  const screen = (screenName: string, properties?: Record<string, any>) => {
    posthog?.screen(screenName, properties)
  }

  return {
    capture,
    screen,
  }
}
