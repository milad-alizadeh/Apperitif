import { ApolloProvider } from '@apollo/client'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useGlobalSearchParams, usePathname } from 'expo-router'
import snakeCase from 'lodash/snakeCase'
import { useEffect } from 'react'
import { LogBox } from 'react-native'
import { Feedback } from '~/components'
import { DetailsModal } from '~/components/DetailsModal'
import { useAnalytics } from '~/hooks'
import { StoreProvider } from '~/providers'
import { AppContentProvider, DetailsModalProvider, SessionProvider } from '~/providers'
import { api } from '~/services/api'
import { initSentry } from '~/services/sentry'
import { customFontsToLoad } from '~/theme/typography'
import { captureError } from '~/utils/captureError'

initSentry()

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
  try {
    return (
      <AppWrapper>
        <SessionProvider>
          <ApolloProvider client={api?.apolloClient}>
            <AppContentProvider>
              <DetailsModalProvider>
                <StoreProvider>
                  <DetailsModal />
                  <Feedback />
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
                    <Stack.Screen name="welcome" />
                    <Stack.Screen name="recipe" getId={({ params }) => params.recipeId} />
                    <Stack.Screen
                      name="filters"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen
                      name="auth"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen name="add-ingredients" />
                  </Stack>
                </StoreProvider>
              </DetailsModalProvider>
            </AppContentProvider>
          </ApolloProvider>
        </SessionProvider>
      </AppWrapper>
    )
  } catch (error) {
    captureError(error.message)
  }
}
