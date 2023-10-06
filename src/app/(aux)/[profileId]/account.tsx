import { useApolloClient } from '@apollo/client'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, Header, Prompt, PromptRef, Screen, Text, TextField } from '~/components'
import { useHaptic } from '~/hooks/useHaptics'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services'

export default function FAQs() {
  const client = useApolloClient()
  const deletPromptRef = useRef<PromptRef>(null)
  const emailPromptRef = useRef<PromptRef>(null)
  const successHaptics = useHaptic('success')
  const errorHaptics = useHaptic('error')
  const { isLoggedIn, user, session } = useSession()
  const [email, setEmail] = useState(user?.email)
  const [name, setName] = useState(user?.user_metadata.name)
  const [emailLoading, setEmailLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteUser = async () => {
    setLoading(true)
    const { data, error } = await api.supabase.rpc('delete_user')

    if (error) {
      Alert.alert(error.message)
    } else {
      if (data) {
        successHaptics()
        await api.supabase.auth.signOut()
        await client.resetStore()
        Alert.alert('Account deleted')
        router.push('/browse')
      } else {
        errorHaptics()
        Alert.alert('Could not delete account. Please try again or contact support.')
      }
    }
    setLoading(false)
  }

  const changeEmail = async () => {
    console.log('change email')
    try {
      setEmailLoading(true)
      const { data, error } = await api.supabase.auth.updateUser({ email, data: { name } })

      console.log(data, error)

      // if (error) {
      //   Alert.alert(error.message)
      // } else {
      //   if (data) {
      //     successHaptics()
      //     Alert.alert('Email changed')
      //   } else {
      //     errorHaptics()
      //     Alert.alert('Could not change email. Please try again or contact support.')
      //   }
      // }
    } catch (error) {
      console.log(error)
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    isLoggedIn && (
      <Screen
        KeyboardAvoidingViewProps={{ enabled: false }}
        preset="fixed"
        safeAreaEdges={['top', 'bottom']}
        contentContainerStyle={{ flex: 1 }}
      >
        <Header title="Account" backButton />

        <View className="px-6 flex-1">
          <View className="mb-16 flex-1">
            <TextField
              label="Your Email"
              onChange={setEmail}
              value={email}
              placeholder="email@example.com"
              autoCapitalize="none"
              styleClassName="w-full"
            />
            <View className="mt-3 mb-6">
              <TextField label="Your Name" onChange={setName} value={name} />
            </View>
            <Button
              loading={emailLoading}
              label="Update Details"
              onPress={() => emailPromptRef?.current?.show()}
            />
          </View>

          {/* Delete Account */}
          <View className="flex-1 absolute bottom-6 w-full left-6">
            <Text h2 styleClassName="mb-6 text-primary">
              Danger Zone
            </Text>
            <Button
              loading={loading}
              label="Delete Account"
              onPress={() => deletPromptRef?.current?.show()}
            />
          </View>
        </View>

        <Prompt
          ref={emailPromptRef}
          title="Update Details"
          cancelText="Cancel"
          confirmText="Update"
          description="Are you sure you want to change your email? "
          onCancel={emailPromptRef?.current?.hide}
          onConfirm={changeEmail}
        />

        <Prompt
          ref={deletPromptRef}
          title="Delete Account"
          cancelText="Cancel"
          confirmText="Delete"
          description="Are you sure you want to delete your account? This action cannot be undone."
          onCancel={deletPromptRef?.current?.hide}
          onConfirm={deleteUser}
        />
      </Screen>
    )
  )
}
