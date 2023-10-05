import { router, useLocalSearchParams } from 'expo-router'
import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, Header, Screen, TextField } from '~/components'
import { api } from '~/services/api'

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

  // Check if email exist and if not add an email
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

  // Send OTP to user
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

    router.push({
      pathname: '/auth/otp-verify',
      params: { attemptedRoute, email, verificationType: 'magiclink' },
    })

    setLoading(false)
  }

  // Sign up user
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
    <Screen preset="scroll">
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
