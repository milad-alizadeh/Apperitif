import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationScope,
  isAvailableAsync,
  signInAsync,
} from 'expo-apple-authentication'
import * as React from 'react'
import { Alert, StyleProp, View, ViewStyle } from 'react-native'
import { useAnalytics } from '~/hooks'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'
import { captureError } from '~/utils/captureError'

interface AppleAuthenticationProps {
  attemptedRoute: string | string[]
}

export const AppleAuthentication = function AppleAuthentication({
  attemptedRoute,
}: AppleAuthenticationProps) {
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)
  const { capture } = useAnalytics()

  return (
    <View>
      {!!isAvailableAsync && (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={12}
          style={$buttonStyle}
          onPress={async () => {
            capture('auth:log_in_press', { provider: 'apple' })
            try {
              const credential = await signInAsync({
                requestedScopes: [
                  AppleAuthenticationScope.FULL_NAME,
                  AppleAuthenticationScope.EMAIL,
                ],
              })

              // Sign in via Supabase Auth.
              if (credential.identityToken) {
                const {
                  data: { session },
                  error,
                } = await api.supabase.auth.signInWithIdToken({
                  provider: 'apple',
                  token: credential.identityToken,
                })

                // First time user sign up
                if (credential.email && credential.fullName) {
                  capture('auth:sign_up_success', { provider: 'apple' })
                  handleSuccessfulAuth()
                }

                if (!error) {
                  handleSuccessfulAuth()
                } else {
                  capture('auth:log_in_error', { provider: 'apple', error: error.message })
                  captureError(error)
                  Alert.alert('Error', error.message)
                }
              } else {
                captureError('No identityToken.')
              }
            } catch (e) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                console.log('User canceled Apple Sign in.')
              } else {
                captureError(`Apple Signin Error ${e}`)
              }
            }
          }}
        />
      )}
    </View>
  )
}

const $buttonStyle: StyleProp<Omit<ViewStyle, 'backgroundColor' | 'borderRadius'>> = {
  width: 256,
  height: 48,
}
