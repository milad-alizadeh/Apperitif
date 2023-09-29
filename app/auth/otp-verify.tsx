import React, { useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { Button, Header, Screen, Text, TextField } from '~/components'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'

export default function AuthOtpVerifyScreen({ route }) {
  const { attemptedRoute, email } = route.params || {}
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)

  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')

  const sendOtp = async () => {
    setLoading(true)
    const { error } = await api.supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    })

    if (error) {
      Alert.alert(error.message)
    }

    setLoading(false)
  }

  const verifyOtp = async () => {
    setLoading(true)

    const { error } = await api.supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'magiclink',
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
        <OtpVerify email={email} onSuccessfullAuth={handleSuccessfulAuth} />
        <View>
          <View className="mb-4">
            <Text styleClassName="mb-4" body>
              We have sent a verification code to your registered email. Please enter it below to
              log in.
            </Text>

            <TextField
              label="Verification Code"
              onChange={setOtp}
              value={otp}
              autoCapitalize="none"
              keyboardType="numeric"
            />

            <TouchableOpacity onPress={() => sendOtp()}>
              <Text styleClassName="my-4 underline" body>
                Resend the code
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button large loading={loading} label="Login" onPress={() => verifyOtp()} />
          </View>
        </View>
      </View>
    </Screen>
  )
}
