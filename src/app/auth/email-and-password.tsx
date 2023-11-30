import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Screen } from '~/components'
import { EmailAuthentication } from '~/components'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'

export default function AuthOtpEmailScreen({ route }) {
  const { attemptedRoute } = useLocalSearchParams()
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)

  return (
    <Screen preset="fixed">
      <View className="p-6">
        <EmailAuthentication handleSuccessfulAuth={handleSuccessfulAuth} />
      </View>
    </Screen>
  )
}
