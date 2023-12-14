import { isDevice } from 'expo-device'
import { Mixpanel } from 'mixpanel-react-native'
import { usePostHog } from 'posthog-react-native'
import { MIXPANEL_API_KEY, MIXPANEL_SERVER_URL } from '~/config'

const trackAutomaticEvents = true
const mixpanel = new Mixpanel(MIXPANEL_API_KEY, trackAutomaticEvents)
mixpanel.setServerURL(MIXPANEL_SERVER_URL)
mixpanel.init()

export const useAnalytics = () => {
  if (!isDevice) {
    return {
      capture: () => {},
      screen: () => {},
      identify: () => {},
      reset: () => {},
      loaded: true,
    }
  }

  const posthog = usePostHog()

  const getDistinctId = (): string => {
    console.log('distinctId', posthog?.getDistinctId())
    return posthog?.getDistinctId()
  }

  const capture = (event: string, properties?: Record<string, any>) => {
    console.log('capture', event, properties)
    mixpanel.track(event, properties)
    posthog?.capture(event, properties)
  }

  const screen = (screenName: string, properties?: Record<string, any>) => {
    if (!screenName || screenName === '/') return
    console.log('screen', screenName, properties)
    mixpanel.track('screen', {
      screen_name: screenName,
      ...properties,
    })
    posthog?.screen(screenName, properties)
  }

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    console.log('identify', distinctId, properties)
    mixpanel.identify(distinctId)
    mixpanel.getPeople().set(properties)
    posthog?.identify(distinctId, properties)
  }

  const reset = () => {
    console.log('reset')
    mixpanel.reset()
    posthog?.reset()
  }

  return {
    capture,
    screen,
    identify,
    reset,
    getDistinctId,
    loaded: typeof posthog !== 'undefined',
  }
}
