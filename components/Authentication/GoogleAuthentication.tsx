import * as Google from 'expo-auth-session/providers/google'
import * as WebBroowser from 'expo-web-browser'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'
import { loadingVar } from '~/store/auth'
import { shadowCard } from '~/theme'
import { Icon } from '../Icon'

WebBroowser.maybeCompleteAuthSession()

export interface AppleAuthenticationProps {
  attemptedRoute: string | string[]
}

export const GoogleAuthentication = function GoogleAuthentication({ attemptedRoute }) {
  const [loading, setLoading] = useState(false)
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  })

  const singInWithOAuth = async (response) => {
    loadingVar(true)
    setLoading(true)
    const token = response.params.id_token
    const access_token = response.params.access_token

    const { data, error } = await api.supabase.auth.signInWithIdToken({
      provider: 'google',
      token,
      access_token,
    })

    if (!error) {
      handleSuccessfulAuth()
      setLoading(false)
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
        onPress={promptAsync}
        className="bg-white flex-row w-64 h-12 items-center justify-center rounded-xl px-2"
        style={{ ...shadowCard }}
      >
        <Icon icon="google" containerClassName="mr-2" />
        <Text className="text-lg font-medium font-roboto">Continue with Google</Text>
      </TouchableOpacity>
    </View>
  )
}
