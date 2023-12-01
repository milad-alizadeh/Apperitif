import { ApolloProvider } from '@apollo/client'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useGlobalSearchParams, usePathname } from 'expo-router'
import snakeCase from 'lodash/snakeCase'
import { PostHogProvider } from 'posthog-react-native'
import { useEffect } from 'react'
import { LogBox } from 'react-native'
import { EasUpdate } from '~/components/EasUpdate'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useSentry } from '~/hooks/useSentry'
import { SessionProvider } from '~/providers/SessionProvider'
import { api } from '~/services/api'
import { customFontsToLoad } from '../theme/typography'

const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useSentry()
  const [loaded, error] = useFonts(customFontsToLoad)

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

const AppWrapper = ({ children }) => {
  const { screen } = useAnalytics()
  const pathname = usePathname()
  const params = useGlobalSearchParams()

  // Track the location in your analytics provider here.
  useEffect(() => {
    if (screen) {
      const snakeCaseParams = Object.keys(params).reduce((acc, key) => {
        acc[snakeCase(key)] = params[key]
        return acc
      }, {})

      if (pathname === '/browse/recipes') {
        screen(pathname)
        return
      }

      screen(pathname, snakeCaseParams)
    }
  }, [pathname, params])

  return <>{children}</>
}

function RootLayoutNav() {
  return (
    <PostHogProvider
      apiKey={posthogApiKey}
      autocapture={{
        captureTouches: false,
        captureScreens: false,
      }}
      options={{ host: 'https://eu.posthog.com' }}
    >
      <AppWrapper>
        <SessionProvider>
          <ApolloProvider client={api?.apolloClient}>
            <EasUpdate />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="recipe" getId={({ params }) => params.recipeName} />
              <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
              <Stack.Screen name="add-ingredients" />
            </Stack>
          </ApolloProvider>
        </SessionProvider>
      </AppWrapper>
    </PostHogProvider>
  )
}
