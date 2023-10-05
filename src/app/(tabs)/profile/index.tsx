import { useApolloClient } from '@apollo/client'
import { router } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Button, Header, IconTypes, ListItem, Screen, Text } from '~/components'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services/api'

interface ProfileItem {
  name: string
  icon: IconTypes
  route: string
}

export default function ProfileHomeScreen() {
  const { user } = useSession()
  const client = useApolloClient()

  const singOut = async () => {
    await api.supabase.auth.signOut()
    await client.resetStore()
    router.push('/browse')
  }

  const renderItem = ({ item: { name, icon, route } }: { item: ProfileItem }) => {
    return (
      <ListItem
        name={name}
        styleClassName="mx-6 mb-3"
        leftIcon={icon}
        rightIcon="chevronRight"
        card
        onPress={() => router.push(route as any)}
      />
    )
  }

  const profileItems: ProfileItem[] = [
    {
      name: 'Account',
      icon: 'user',
      route: '/profile/[profileId]',
    },
    {
      name: 'FAQs',
      icon: 'chat',
      route: '/profile/faqs',
    },
    {
      name: 'Privacy Policy',
      icon: 'file',
      route: '/profile/privacy-policy',
    },
    {
      name: 'Terms & Conditions',
      icon: 'file',
      route: '/profile/terms-and-conditions',
    },
  ]

  // Pull in navigation via hook
  return (
    <Screen safeAreaEdges={['bottom', 'top']}>
      <Header title="Profile" />

      <FlatList
        data={profileItems}
        renderItem={renderItem}
        keyExtractor={(item) => item?.name}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={<Button label="Sign Out" onPress={singOut} />}
      />
    </Screen>
  )
}
