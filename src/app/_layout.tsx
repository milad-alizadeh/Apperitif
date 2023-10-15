import { ApolloProvider } from '@apollo/client'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useExpoUpdate } from '~/hooks/useExpoUpdate'
import { SessionProvider } from '~/providers/SessionProvider'
import { api } from '~/services/api'
import { customFontsToLoad } from '../theme/typography'

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
  useExpoUpdate()
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
      <ApolloProvider client={api?.apolloClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="recipe/[recipeId]" getId={({ params }) => params.recipeId} />
          <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
          <Stack.Screen name="add-ingredients" />
        </Stack>
      </ApolloProvider>
    </SessionProvider>
  )
}
