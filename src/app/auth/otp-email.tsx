import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, Header, Screen, TextField } from '~/components'
import { api } from '~/services/api'
import { isAndroid } from '~/utils'

export default function AuthOtpEmailScreen({ route }) {
  const { attemptedRoute } = useLocalSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailExist, setEmailExist] = useState(true)
  const [name, setName] = useState('')

  useEffect(() => {
    setEmail('')
    setName('')
    setEmailExist(true)
  }, [])

  /**
   * Checks if the provided email exists in the database using a Supabase RPC call.
   * If the email exists, it sends an OTP to the email.
   * If the email does not exist, it sets the state variable 'emailExist' to false.
   */
  const checkIfEmailExist = async () => {
    setLoading(true)

    const { data, error } = await api.supabase.rpc('does_email_exist', {
      email,
    })

    if (error) {
      Alert.alert(error.message)
    } else {
      if (data) {
        sendOtp()
      } else {
        setEmailExist(false)
      }
    }

    setLoading(false)
  }

  /**
   * Sends an OTP to the user's email address and navigates to the OTP verification screen.
   * @returns {Promise<void>}
   */
  const sendOtp = async () => {
    setLoading(true)

    const { error } = await api.supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    })

    if (error) {
      Alert.alert(error.message)
    }

    router.push({
      pathname: '/auth/otp-verify',
      params: { attemptedRoute, email, verificationType: 'magiclink' },
    })

    setLoading(false)
  }

  /**
   * Signs up the user with the provided email and a randomly generated password.
   * If successful, navigates to the OTP verification screen.
   * @returns {Promise<void>}
   */
  const signup = async () => {
    setLoading(true)
    const { error } = await api.supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-16),
      options: {
        data: {
          email,
          name,
        },
      },
    })

    if (error) {
      Alert.alert(error.message)
    } else {
      router.push({
        pathname: '/auth/otp-verify',
        params: { attemptedRoute, email, verificationType: 'signup' },
      })
    }

    setLoading(false)
  }
  return (
    <Screen preset="scroll" safeAreaEdges={isAndroid ? ['top'] : []}>
      <Header verticalPadding title="Sign up or login" backButton />
      <View className="p-6">
        <View>
          <View>
            <TextField
              label="Your Email"
              onChange={setEmail}
              value={email}
              placeholder="email@example.com"
              autoCapitalize="none"
            />
          </View>
          {!emailExist && (
            <View className="mt-4">
              <TextField label="Your Name" onChange={setName} value={name} />
            </View>
          )}
          <View className="mt-6">
            <Button
              large
              loading={loading}
              label="Continue"
              onPress={() => (!emailExist ? signup() : checkIfEmailExist())}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}
