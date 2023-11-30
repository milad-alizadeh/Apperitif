import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, Header, Prompt, PromptRef, Screen, Text, TextField } from '~/components'
import { useAnalytics } from '~/hooks'
import { useHaptics } from '~/hooks/useHaptics'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services'

export default function Account() {
  const { capture } = useAnalytics()
  const deletPromptRef = useRef<PromptRef>(null)
  const emailPromptRef = useRef<PromptRef>(null)
  const successHaptics = useHaptics('success')
  const errorHaptics = useHaptics('error')
  const { isLoggedIn, user, session } = useSession()
  const [email, setEmail] = useState(user?.email)
  const [emailLoading, setEmailLoading] = useState(false)
  const [enableEmailChange, setEnableEmailChange] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [name, setName] = useState(user?.user_metadata.name)

  useEffect(() => {
    user?.app_metadata.provider === 'email' && setEnableEmailChange(true)
  }, [user?.app_metadata.provider])

  /**
   * Deletes the user's account.
   * @returns {Promise<void>} A Promise that resolves when the account is deleted successfully.
   */
  const deleteUser = async (): Promise<void> => {
    setDeleteLoading(true)
    const { data, error } = await api.supabase.rpc('delete_user')

    if (error) {
      errorHaptics()
      Alert.alert(error.message)
    } else {
      if (data) {
        successHaptics()
        await api.supabase.auth.signOut()
        Alert.alert('Account deleted')
        router.push('/browse')
        capture('account:delete_success')
      } else {
        errorHaptics()
        Alert.alert('Could not delete account. Please try again or contact support.')
      }
    }
    setDeleteLoading(false)
  }

  /**
   * Changes the account details of the user, including email and name.
   * If the email is changed, an OTP is sent to the new email for verification.
   * @returns {Promise<void>}
   */
  const changeAccountDetails = async () => {
    setEmailLoading(true)

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
          'content-type': 'application/json;charset=UTF-8',
          'x-client-info': 'supabase-js-react-native/2.38.0',
        },
        body: JSON.stringify({
          email,
          data: { name },
          code_challenge: null,
          code_challenge_method: null,
        }),
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
      })

      const data = await response.json()

      // If email is changed then send OTP
      if (user?.email !== email) {
        // Check if new email exist and if not add an email
        const { data: emailExists, error } = await api.supabase.rpc('does_email_exist', {
          email,
        })

        if (error) {
          Alert.alert(error.message)
          return
        }

        if (emailExists) {
          Alert.alert('Email already exist')
          return
        } else {
          router.push({
            pathname: '/auth/otp-verify',
            params: {
              attemptedRoute: `/${user.id}/account`,
              email,
              verificationType: 'email_change',
            },
          })
        }
      } else {
        // Refresh session
        await api.supabase.auth.refreshSession()
        Alert.alert('Details updated')
      }
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
              <Button
                loading={emailLoading}
                label="Update Details"
                onPress={() => changeAccountDetails()}
              />
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
              loading={deleteLoading}
              label="Delete Account"
              onPress={() => {
                capture('account:delete_account_press')
                deletPromptRef?.current?.show()
              }}
            />
          </View>
        </View>

        <Prompt
          ref={emailPromptRef}
          title="Update Details"
          cancelText="Cancel"
          confirmText="Update"
          description="Are you sure you want to change your email? "
          onCancel={() => {
            emailPromptRef?.current?.hide()
          }}
          onConfirm={changeAccountDetails}
        />

        <Prompt
          ref={deletPromptRef}
          title="Delete Account"
          cancelText="Cancel"
          confirmText="Delete"
          description="Are you sure you want to delete your account? This action cannot be undone."
          onCancel={() => {
            capture('account:delete_cancel_press')
            deletPromptRef?.current?.hide()
          }}
          onConfirm={() => {
            capture('account:delete_confirm_press')
            deleteUser()
          }}
        />
      </Screen>
    )
  )
}
