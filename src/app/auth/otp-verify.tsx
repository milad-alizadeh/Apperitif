import { EmailOtpType, MobileOtpType } from '@supabase/supabase-js'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native'
import { Button, Header, Screen, Text, TextField } from '~/components'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'

export default function AuthOtpVerifyScreen({ route }) {
  const { attemptedRoute, email, verificationType } = useLocalSearchParams() as {
    attemptedRoute: string
    email: string
    verificationType: EmailOtpType
  }
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [otp, setOtp] = useState('')

  // Resend OTP to user
  const resendOtp = async () => {
    setResendLoading(true)

    if (verificationType === 'magiclink') {
      const { error } = await api.supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      })

      if (error) {
        Alert.alert(error.message)
      } else {
        Alert.alert('A verification code sent!')
      }
    } else {
      const { error, data } = await api.supabase.auth.resend({
        email,
        type: verificationType === 'email_change' ? 'email_change' : 'signup',
      })

      console.log(error, data)

      if (error) {
        Alert.alert(error.message)
      } else {
        Alert.alert('A verification code sent!')
      }
    }

    setResendLoading(false)
  }

  // Verify OTP
  const verifyOtp = async () => {
    setLoading(true)

    const { error } = await api.supabase.auth.verifyOtp({
      email,
      token: otp,
      type: verificationType,
    })

    if (error) {
      Alert.alert(error.message)
    } else {
      handleSuccessfulAuth()
    }

    setLoading(false)
  }

  return (
    <Screen preset="scroll">
      <Header verticalPadding title="Enter code" backButton />
      <View className="p-6">
        <View>
          <View className="mb-4">
            <Text styleClassName="mb-4" body>
              {verificationType === 'email_change'
                ? 'We have sent a verification code to your new email. Please enter it below to verify the changes'
                : 'We have sent a verification code to your registered email. Please enter it below to log in.'}
            </Text>

            <TextField
              label="Verification Code"
              onChange={setOtp}
              value={otp}
              autoCapitalize="none"
              keyboardType="numeric"
            />

            <TouchableOpacity className="flex-row" onPress={() => resendOtp()}>
              <Text styleClassName="my-4 underline mr-4" body>
                Resend the code
              </Text>
              {<ActivityIndicator animating={resendLoading} />}
            </TouchableOpacity>
          </View>
          <View>
            <Button
              large
              loading={loading}
              label={verificationType === 'email_change' ? 'Verify Email Address' : 'Login'}
              onPress={() => verifyOtp()}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}
