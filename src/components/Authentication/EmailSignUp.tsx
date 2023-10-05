import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { api } from '~/services/api'
import { Button } from '../Button'
import { TextField } from '../TextField'

export interface EmailSignUpProps {
  email: string
  onSuccessfullAuth: () => void
}

/**
 * Describe your component here
 */
export const EmailSignUp = function EmailSignUp({ email, onSuccessfullAuth }: EmailSignUpProps) {
  const [localEmail, setLocalEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    setLocalEmail(email)
  }, [email])

  const signup = async () => {
    setLoading(true)
    const { error } = await api.supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: {
          name,
          email,
        },
      },
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
        <TextField label="Name" onChange={setName} value={name} />
      </View>
      <View className="mb-4">
        <TextField
          label="Email"
          onChange={setLocalEmail}
          value={localEmail}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Button large loading={loading} label="Sign up" onPress={() => signup()} />
      </View>
    </View>
  )
}
