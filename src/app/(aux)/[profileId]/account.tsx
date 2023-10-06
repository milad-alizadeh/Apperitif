import { useApolloClient } from '@apollo/client'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useRef } from 'react'
import { Alert, View } from 'react-native'
import { Button, Header, Prompt, PromptRef, Screen, Text } from '~/components'
import { api } from '~/services'

export default function FAQs() {
  const client = useApolloClient()
  const promptRef = useRef<PromptRef>(null)

  const deleteUser = async () => {
    console.log('deleteUser')
    const { data, error } = await api.supabase.rpc('delete_user')

    if (error) {
      Alert.alert(error.message)
    } else {
      if (data) {
        await api.supabase.auth.signOut()
        await client.resetStore()
        Alert.alert('Account deleted')
        router.push('/browse')
      } else {
        Alert.alert('Could not delete account. Please try again or contact support.')
      }
    }
  }

  return (
    <Screen preset="scroll" safeAreaEdges={['top']} contentContainerStyle={{ flex: 1 }}>
      <Header title="Account" backButton />
      <View className="px-6">
        <Text h2 styleClassName="mb-6 text-primary">
          Danger Zone
        </Text>
        <Button label="Delete Account" onPress={() => promptRef?.current?.show()} />
      </View>

      <Prompt
        ref={promptRef}
        title="Delete Account"
        cancelText="Cancel"
        confirmText="Delete"
        description="Are you sure you want to delete your account? This action cannot be undone."
        onCancel={promptRef?.current?.hide}
        onConfirm={deleteUser}
      />
    </Screen>
  )
}
