import { EmailOtpType, MobileOtpType } from '@supabase/supabase-js'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native'
import { Button, Header, Screen, Text, TextField } from '~/components'
import { useAnalytics } from '~/hooks'
import { useSuccessfullAuthHandler } from '~/hooks/useSuccessfullAuthHandler'
import { api } from '~/services/api'
import { captureError } from '~/utils/captureError'

/**
 * Component for verifying OTP (One-Time Password) during authentication.
 *
 * @param {object} route - The route object containing the attempted route, email, and verification type.
 * @returns {JSX.Element} - The OTP verification screen.
 */
export default function AuthOtpVerifyScreen({ route }) {
  const { capture } = useAnalytics()
  const { attemptedRoute, email, verificationType } = useLocalSearchParams() as {
    attemptedRoute: string
    email: string
    verificationType: EmailOtpType
  }
  const { handleSuccessfulAuth } = useSuccessfullAuthHandler(attemptedRoute)
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [otp, setOtp] = useState('')

  /**
   * Resends the OTP verification code to the user's email or mobile number.
   * @returns {Promise<void>}
   */
  const resendOtp = async (): Promise<void> => {
    setResendLoading(true)

    if (verificationType === 'magiclink') {
      const { error } = await api.supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      })

      if (error) {
        captureError(error)
        capture('auth:log_in_error', { provider: 'email', error: error.message })
        Alert.alert(error.message)
      } else {
        Alert.alert('A verification code sent!')
      }
    } else {
      // @TODO: Add mobile OTP resend not working with email change
      const { error, data } = await api.supabase.auth.resend({
        email,
        type: verificationType === 'email_change' ? 'email_change' : 'signup',
      })

      if (error) {
        captureError(error)
        Alert.alert(error.message)
      } else {
        Alert.alert('A verification code sent!')
      }
    }

    setResendLoading(false)
  }

  /**
   * Verify OTP code for the given email and verification type.
   * @async
   * @function verifyOtp
   * @returns {Promise<void>}
   */
  const verifyOtp = async () => {
    setLoading(true)

    const { data, error } = await api.supabase.auth.verifyOtp({
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
