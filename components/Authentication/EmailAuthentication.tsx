import { api } from '~/services/api'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Alert, View } from 'react-native'

import { Button } from '../Button'
import { TextField } from '../TextField'

export interface EmailAuthenticationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  handleSuccessfulAuth?: () => void
}

/**
 * Describe your component here
 */
export const EmailAuthentication = observer(function EmailAuthentication({
  handleSuccessfulAuth,
}: EmailAuthenticationProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await api.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) Alert.alert(error.message)

    handleSuccessfulAuth()
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await api.supabase.auth.signUp({
      email,
      password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View>
      <View className="mb-4">
        <TextField
          label="Email"
          onChange={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-4">
        <TextField
          label="Password"
          onChange={(text) => setPassword(text)}
          value={password}
          password
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View>
        <Button label="Sign in" onPress={() => signInWithEmail()} />
      </View>
    </View>
  )
})
