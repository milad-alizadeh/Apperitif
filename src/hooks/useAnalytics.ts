import { isDevice } from 'expo-device'
import { Mixpanel } from 'mixpanel-react-native'
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
  const capture = (event: string, properties?: Record<string, any>) => {
    console.log('capture', event, properties)
    mixpanel.track(event, properties)
  }

  const screen = (screenName: string, properties?: Record<string, any>) => {
    if (!screenName || screenName === '/') return
    console.log('screen', screenName, properties)
    mixpanel.track('screen', {
      screen_name: screenName,
      ...properties,
    })
  }

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    console.log('identify', distinctId, properties)
    mixpanel.identify(distinctId)
    mixpanel.getPeople().set(properties)
  }

  const reset = () => {
    console.log('reset')
    mixpanel.reset()
  }

  return {
    capture,
    screen,
    identify,
    reset,
  }
}
