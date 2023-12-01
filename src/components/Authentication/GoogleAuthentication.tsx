import * as Google from 'expo-auth-session/providers/google'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAnalytics } from '~/hooks'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'
import { loadingVar } from '~/store/auth'
import { shadowCard } from '~/theme'
import { captureError } from '~/utils/captureError'
import { Icon } from '../Icon'

WebBrowser.maybeCompleteAuthSession()

export interface AppleAuthenticationProps {
  attemptedRoute: string | string[]
}

export const GoogleAuthentication = function GoogleAuthentication({ attemptedRoute }) {
  const { capture } = useAnalytics()
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)

  const [_request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  })

  const singInWithOAuth = async (response) => {
    loadingVar(true)
    const token = response.params.id_token
    const access_token = response.params.access_token

    const {
      data: { user },
      error,
    } = await api.supabase.auth.signInWithIdToken({
      provider: 'google',
      token,
      access_token,
    })

    // First time user sign up. Check if usser has been created in the last 30 seconds
    if (user?.created_at && new Date(user?.created_at).getTime() > Date.now() - 30000) {
      capture('auth:sign_up_success', { provider: 'google' })
    }

    if (!error) {
      handleSuccessfulAuth()
    } else {
      // handle errors
      captureError(error)
      capture('auth:log_in_error', { provider: 'google', error: error.message })
    }

    loadingVar(false)
  }

  useEffect(() => {
    if (!response) return
    if (response?.type === 'success') {
      singInWithOAuth(response)
    } else {
      console.log('response error', response)
    }
  }, [response])

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          capture('auth:log_in_press', { provider: 'google' })
          promptAsync()
        }}
        className="bg-white flex-row w-64 h-12 items-center justify-center rounded-xl px-2"
        style={{ ...shadowCard }}
      >
        <Icon icon="google" containerClassName="mr-2" />
        <Text className="text-lg font-medium font-roboto">Continue with Google</Text>
      </TouchableOpacity>
    </View>
  )
}
