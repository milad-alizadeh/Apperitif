import * as Google from 'expo-auth-session/providers/google'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'
import { loadingVar } from '~/store/auth'
import { shadowCard } from '~/theme'
import { Icon } from '../Icon'

WebBrowser.maybeCompleteAuthSession()

export interface AppleAuthenticationProps {
  attemptedRoute: string | string[]
}

export const GoogleAuthentication = function GoogleAuthentication({ attemptedRoute }) {
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      // Process the URL here
      console.log('url', url)
    }

    // Add a listener for incoming URLs
    Linking.addEventListener('url', handleDeepLink)
  }, [])

  const [_request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  })

  const singInWithOAuth = async (response) => {
    loadingVar(true)
    const token = response.params.id_token
    const access_token = response.params.access_token

    const { error } = await api.supabase.auth.signInWithIdToken({
      provider: 'google',
      token,
      access_token,
    })

    if (!error) {
      handleSuccessfulAuth()
    } else {
      // handle errors
      console.log('error', error)
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
        onPress={() => promptAsync()}
        className="bg-white flex-row w-64 h-12 items-center justify-center rounded-xl px-2"
        style={{ ...shadowCard }}
      >
        <Icon icon="google" containerClassName="mr-2" />
        <Text className="text-lg font-medium font-roboto">Continue with Google</Text>
      </TouchableOpacity>
    </View>
  )
}
