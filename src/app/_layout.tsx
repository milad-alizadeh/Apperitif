import { ApolloProvider } from '@apollo/client'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { PostHogProvider } from 'posthog-react-native'
import { useEffect } from 'react'
import { LogBox } from 'react-native'
import { EasUpdate } from '~/components/EasUpdate'
import { useSentry } from '~/hooks/useSentry'
import { SessionProvider } from '~/providers/SessionProvider'
import { api } from '~/services/api'
import { customFontsToLoad } from '../theme/typography'

const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY
console.log('posthogApiKey', posthogApiKey)
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

function RootLayoutNav() {
  return (
    <SessionProvider>
      <PostHogProvider
        apiKey={posthogApiKey}
        autocapture={{
          captureScreens: false,
        }}
        options={{ host: 'https://eu.posthog.com' }}
      >
        <ApolloProvider client={api?.apolloClient}>
          <EasUpdate />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="welcome" />
            <Stack.Screen name="recipe/[recipeId]" getId={({ params }) => params.recipeId} />
            <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
            <Stack.Screen name="add-ingredients" />
          </Stack>
        </ApolloProvider>
      </PostHogProvider>
    </SessionProvider>
  )
}
