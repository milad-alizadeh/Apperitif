import { usePostHog } from 'posthog-react-native'

export const useAnalytics = () => {
  const posthog = usePostHog()

  const capture = (event: string, properties?: Record<string, any>) => {
    posthog?.capture(event, properties)
  }

  const screen = (screenName: string) => {
    posthog?.screen(screenName)
  }

  return {
    capture,
    screen,
  }
}
