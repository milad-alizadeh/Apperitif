import { router } from 'expo-router'
import React, { FC } from 'react'
import { Button, Header, Screen, Text } from '~/components'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services/api'

export default function ProfileHomeScreen() {
  const { user } = useSession()

  const singOut = async () => {
    await api.supabase.auth.signOut()
    router.push('/browse')
  }

  // Pull in navigation via hook
  return (
    <Screen safeAreaEdges={['bottom', 'top']}>
      <Header title="Profile" />
      <Text h2>{user?.email}</Text>

      <Button label="Sign Out" onPress={singOut} />
    </Screen>
  )
}
