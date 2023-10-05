import { useReactiveVar } from '@apollo/client'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Platform } from 'react-native'
import { AppleAuthentication, Icon, Screen, Text } from '~/components'
import { GoogleAuthentication } from '~/components/Authentication/GoogleAuthentication'
import { loadingVar } from '~/store/auth'
import { colors } from '~/theme'

export default function AuthHomeScreen() {
  const { attemptedRoute } = useLocalSearchParams()
  const loading = useReactiveVar(loadingVar)

  return (
    <Screen
      contentContainerStyle={{
        backgroundColor: colors.neutral[100],
        padding: 24,
        flex: 1,
      }}
    >
      <Icon
        icon="close"
        containerClassName="absolute top-6 right-6"
        onPress={() => router.back()}
      />

      <View>
        <View className="items-center my-8">
          <Image className="w-56 h-56" source={require('~assets/images/logo.png')} />
          <Text styleClassName="text-xl font-bold mb-2">Sign up or login to continue.</Text>
          <Text body>It only takes a moment.</Text>
        </View>

        {Platform.OS === 'ios' && (
          <View className="items-center mb-4">
            <AppleAuthentication attemptedRoute={attemptedRoute} />
          </View>
        )}

        <View className="items-center">
          <GoogleAuthentication attemptedRoute={attemptedRoute} />
        </View>

        <View className="items-center">{/* <GoogleAuthentication /> */}</View>

        <View className="items-center my-8">
          <Text body styleClassName="bg-neutral-100 -mb-[10] z-10 px-3 font-medium">
            or
          </Text>
          <View className="w-full h-[1px] bg-neutral-300" />
        </View>

        <View className="items-center">
          <TouchableOpacity
            className="p-1"
            onPress={() => router.push({ pathname: '/auth/otp-email', params: { attemptedRoute } })}
          >
            <Text body styleClassName="text-neutral-800 font-bold underline underline-offset-3">
              Continue with Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View className="absolute w-screen h-screen top-0 left-0 bg-black/80 items-center justify-center">
          <ActivityIndicator color={colors.white} />
        </View>
      )}
    </Screen>
  )
}
