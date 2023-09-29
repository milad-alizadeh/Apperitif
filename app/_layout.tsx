import { ApolloProvider } from '@apollo/client'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
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
    <ApolloProvider client={api.apolloClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="recipe" />
        <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
        {/* 
      // <Stack.Screen name="MainTab"/>


      <Stack.Screen name="AddIngredients"/>

      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        options={{ presentation: 'modal' }}
      /> */}
      </Stack>
    </ApolloProvider>
  )
}
