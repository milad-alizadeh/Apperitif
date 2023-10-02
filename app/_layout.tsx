import { ApolloProvider } from '@apollo/client'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SessionProvider } from '~/providers/SessionProvider'
import { api } from '~/services/api'
import { customFontsToLoad } from '../theme/typography'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
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

function RootLayoutNav() {
  return (
    <SessionProvider>
      <ApolloProvider client={api.apolloClient}>
        {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="recipe/[recipeId]" />
          <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
        </Stack>
        {/* </GestureHandlerRootView> */}
      </ApolloProvider>
    </SessionProvider>
  )
}
