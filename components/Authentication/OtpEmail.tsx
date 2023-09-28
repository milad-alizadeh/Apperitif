import { api } from '~/services/api'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

import { Button } from '../Button'
import { TextField } from '../TextField'

export interface OtpEmailProps {
  onEmailExists: (email: string) => void
}

/**
 * Describe your component here
 */
export const OtpEmail = observer(function OtpEmail({ onEmailExists }: OtpEmailProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showName, setShowName] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    setEmail('')
    setName('')
  }, [])

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
        setShowName(true)
      }
    }

    setLoading(false)
  }

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
    } else {
      onEmailExists(email)
    }

    setLoading(false)
  }

  const signup = async () => {
    setLoading(true)
    const { error } = await api.supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-8),
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
      sendOtp()
    }

    setLoading(false)
  }

  return (
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
      {showName && (
        <View className="mt-4">
          <TextField label="Your Name" onChange={setName} value={name} />
        </View>
      )}
      <View className="mt-6">
        <Button
          large
          loading={loading}
          label="Continue"
          onPress={() => (showName ? signup() : checkIfEmailExist())}
        />
      </View>
    </View>
  )
})
