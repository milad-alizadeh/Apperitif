import { api } from 'app/services/api'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'

import { Button } from '../Button'
import { Text } from '../Text'
import { TextField } from '../TextField'

export interface OtpVerifyProps {
  onSuccessfullAuth: () => void
  email: string
}

/**
 * Describe your component here
 */
export const OtpVerify = observer(function OtpVerify({ onSuccessfullAuth, email }: OtpVerifyProps) {
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
      onSuccessfullAuth()
    }

    setLoading(false)
  }

  return (
    <View>
      <View className="mb-4">
        <Text styleClassName="mb-4" body>
          We have sent a verification code to your registered email. Please enter it below to log
          in.
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
  )
})
