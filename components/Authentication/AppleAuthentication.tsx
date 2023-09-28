import { api } from '~/services/api'
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

export interface AppleAuthenticationProps {}

export const AppleAuthentication = function AppleAuthentication() {
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

              console.log(credential.identityToken)

              const data = await api.supabase.auth.signInWithIdToken({
                provider: 'apple',
                token: credential.identityToken,
              })

              console.log(data, 'data')
            } catch (e) {
              if (e.code === 'ERR_CANCELED') {
                console.log('User canceled Apple Sign in.')
              } else {
                console.log('error', e)
              }
            }
          }}
        />
      )}
    </View>
  )
}

const $buttonStyle: StyleProp<Omit<ViewStyle, 'backgroundColor' | 'borderRadius'>> = {
  width: 240,
  height: 48,
}
