import { useReactiveVar } from '@apollo/client'
import { isDevice } from 'expo-device'
import { Image } from 'expo-image'
import { Link, router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Platform, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppleAuthentication, GoogleAuthentication, Icon, Screen, Text } from '~/components'
import { useAnalytics } from '~/hooks'
import { loadingVar } from '~/store/auth'
import { colors } from '~/theme'
import * as WebBrowser from 'expo-web-browser'
import { END_USER_LICENCE_AGREEMENT_URL, PRIVACY_POLICY_URL } from '~/config'

export default function AuthHomeScreen() {
  const { capture } = useAnalytics()
  const { attemptedRoute } = useLocalSearchParams()
  const loading = useReactiveVar(loadingVar)
  const topOffset = useSafeAreaInsets().top
  const isAnroid = Platform.OS === 'android'
  const iconTop = isAnroid ? topOffset + 24 : 24

  return (
    <Screen
      contentContainerStyle={{
        backgroundColor: colors.neutral[100],
        padding: 24,
        flex: 1,
      }}
    >
      <View className="absolute right-6 z-20 " style={{ top: iconTop }}>
        <Icon
          icon="close"
          size="large"
          onPress={() => {
            router.back()
          }}
        />
      </View>

      <View testID="auth-screen">
        <View className="items-center my-8">
          <Image className="w-56 h-56" source={require('~assets/images/logo.png')} />
          <Text styleClassName="text-xl font-bold mb-2">Sign up or login to continue.</Text>
          <Text body>It only takes a moment.</Text>
        </View>

        {/* Apple Authentication */}
        {Platform.OS === 'ios' && (
          <View className="items-center mb-4">
            <AppleAuthentication attemptedRoute={attemptedRoute} />
          </View>
        )}

        {/* Google Authentication */}
        <View className="items-center">
          <GoogleAuthentication attemptedRoute={attemptedRoute} />
        </View>

        <View className="items-center my-8">
          <Text body styleClassName="bg-neutral-100 -mb-[10] z-10 px-3 font-medium">
            or
          </Text>
          <View className="w-full h-[1px] bg-neutral-300" />
        </View>

        {/* One time password with email */}
        <View className="items-center">
          <TouchableOpacity
            className="p-1"
            onPress={() => {
              capture('auth:log_in_press', { provider: 'email' })
              router.push({ pathname: '/auth/otp-email', params: { attemptedRoute } })
            }}
          >
            <Text body styleClassName="text-neutral-800 font-medium underline underline-offset-3">
              Continue with Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* One time password with email */}
        {!isDevice && (
          <View className="items-center">
            <TouchableOpacity
              className="p-1"
              onPress={() => {
                router.push({ pathname: '/auth/email-and-password', params: { attemptedRoute } })
              }}
              testID="auth-email-password"
            >
              <Text body styleClassName="text-neutral-800 font-medium underline underline-offset-3">
                Continue with Email & Password
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {loading && (
        <View className="absolute w-screen h-screen top-0 left-0 bg-black/80 items-center justify-center">
          <ActivityIndicator color={colors.white} />
        </View>
      )}

      <View className="mt-auto mb-3">
        <Text small styleClassName="text-center text-neutral-500">
          By continuing, you agree to our{' '}
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync(END_USER_LICENCE_AGREEMENT_URL)
            }}
          >
            <Text small styleClassName="text-neutral-800 underline top-[2px]">
              EULA
            </Text>
          </TouchableOpacity>{' '}
          and our{' '}
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL)
            }}
          >
            <Text small styleClassName="text-neutral-800 underline top-[2px]">
              Privacy Policy
            </Text>
          </TouchableOpacity>
          .
        </Text>
      </View>
    </Screen>
  )
}
