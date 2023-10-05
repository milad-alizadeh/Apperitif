import { useApolloClient } from '@apollo/client'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, View } from 'react-native'
import { Header, IconTypes, ListItem, Screen, Text } from '~/components'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services/api'

interface ProfileItem {
  name: string
  icon: IconTypes
  route?: string
  onPress?: () => void
}

export default function ProfileHomeScreen() {
  const { user } = useSession()
  const client = useApolloClient()

  const singOut = async () => {
    await api.supabase.auth.signOut()
    await client.resetStore()
    router.push('/browse')
  }

  const renderItem = ({ item }: { item: ProfileItem }) => {
    if (!item) return <View className="h-12" />
    const { name, icon, route } = item
    const onPress = item.onPress || (() => router.push(route as any))
    return (
      <ListItem
        name={name}
        styleClassName="mx-6 mb-3"
        leftIcon={icon}
        rightIcon="chevronRight"
        card
        onPress={onPress}
      />
    )
  }

  const profileItems: ProfileItem[] | null[] = [
    {
      name: 'Account',
      icon: 'user',
      route: '/profile/',
    },
    {
      name: 'FAQs',
      icon: 'chat',
      route: '/faqs',
    },
    {
      name: 'About',
      icon: 'infoCircle',
      route: '/about',
    },
    null,
    {
      name: 'Privacy Policy',
      icon: 'file',
      route: '/privacy-policy',
    },
    {
      name: 'Terms & Conditions',
      icon: 'file',
      route: '/terms-and-conditions',
    },
    null,
    {
      name: 'Sign Out',
      icon: 'logOut',
      onPress: () => singOut(),
    },
  ]

  // Pull in navigation via hook
  return (
    <Screen safeAreaEdges={['bottom', 'top']} contentContainerStyle={{ flex: 1 }}>
      <Header title="Profile" />

      <FlatList
        className="flex-1"
        data={profileItems}
        renderItem={renderItem}
        keyExtractor={(item) => item?.name}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={
          <View>
            <Text styleClassName="text-sm px-6">Logged in as {user?.email}</Text>
          </View>
        }
      />
    </Screen>
  )
}
