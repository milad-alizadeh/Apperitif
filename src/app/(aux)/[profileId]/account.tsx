import { useApolloClient } from '@apollo/client'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, Header, Prompt, PromptRef, Screen, Text, TextField } from '~/components'
import { useHaptic } from '~/hooks/useHaptics'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services'

async function changeEmail() {
  console.log('change email')
  // setEmailLoading(true)
  const response = await api.supabase.auth.updateUser({ data: { name } })

  console.log(response, 'data')

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
}

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
  const [enableEmailChange, setEnableEmailChange] = useState(false)

  useEffect(() => {
    user?.app_metadata.provider === 'email' && setEnableEmailChange(true)
  }, [user?.app_metadata.provider])

  const deleteUser = async () => {
    setLoading(true)
    const { data, error } = await api.supabase.rpc('delete_user')

    if (error) {
      errorHaptics()
      Alert.alert(error.message)
    } else {
      if (data) {
        successHaptics()
        await client.resetStore()
        await api.supabase.auth.signOut()
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
    const { data } = await api.supabase.auth.updateUser({
      data: { name },
      email,
    })

    if (data.user.email_change_sent_at) {
      router.push({
        pathname: '/auth/otp-verify',
        params: { attemptedRoute: `/${user.id}/account`, email, verificationType: 'email_change' },
      })
    } else {
      Alert.alert('Details updated')
    }

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
          {enableEmailChange ? (
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
              <Button loading={emailLoading} label="Update Details" onPress={() => changeEmail()} />
            </View>
          ) : (
            <View>
              <Text body>
                Since you have used a social provider to sign up, you cannot change your email.
              </Text>
              <Text h3 styleClassName="mb-3 mt-6">
                Provider
              </Text>
              <Text body styleClassName="capitalize">
                {user?.app_metadata?.provider}
              </Text>

              <Text h3 styleClassName="mb-3 mt-6">
                Name
              </Text>
              <Text body>{user?.user_metadata?.name}</Text>

              <Text h3 styleClassName="mb-3 mt-6">
                Email
              </Text>
              <Text body>{user?.email}</Text>
            </View>
          )}

          {/* Delete Account */}
          <View className="flex-1 absolute bottom-6 w-full left-6">
            <Text h3 styleClassName="mb-6 text-primary">
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
