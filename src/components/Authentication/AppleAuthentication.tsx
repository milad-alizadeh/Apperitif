import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationScope,
  isAvailableAsync,
  signInAsync,
} from 'expo-apple-authentication'
import * as React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'
import { captureError } from '~/utils/captureError'

export interface AppleAuthenticationProps {
  attemptedRoute: string | string[]
}

export const AppleAuthentication = function AppleAuthentication({
  attemptedRoute,
}: AppleAuthenticationProps) {
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)

  return (
    <View>
      {!!isAvailableAsync && (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={12}
          style={$buttonStyle}
          onPress={async () => {
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
                  error,
                  data: { user },
                } = await api.supabase.auth.signInWithIdToken({
                  provider: 'apple',
                  token: credential.identityToken,
                })
                if (!error) {
                  handleSuccessfulAuth()
                } else {
                  // handle errors
                  captureError(error)
                }
              } else {
                captureError('No identityToken.')
              }
            } catch (e) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                captureError('User canceled Apple Sign in.')
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
