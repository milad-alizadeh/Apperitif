import { useApolloClient } from '@apollo/client'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Linking, View } from 'react-native'
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

  const profileItems: ProfileItem[] | null[] = [
    {
      name: 'Account',
      icon: 'user',
      route: `/${user?.id}/account`,
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
      name: 'Contact',
      icon: 'mail',
      route: 'mailto:contact@bubblewrap.ai',
    },
    {
      name: 'Sign Out',
      icon: 'logOut',
      onPress: () => singOut(),
    },
  ]

  const singOut = async () => {
    await api.supabase.auth.signOut()
    await client.resetStore()
    router.push('/browse')
  }

  const renderItem = ({ item }: { item: ProfileItem }) => {
    if (!item) return <View className="h-8" />
    const { name, icon, route } = item
    const mailLink = route?.indexOf('mailto') > -1

    let onPress = item.onPress || (() => router.push(route as any))
    if (mailLink) onPress = () => Linking.openURL(route as any)
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

  // Pull in navigation via hook
  return (
    <Screen safeAreaEdges={['bottom', 'top']} contentContainerStyle={{ flex: 1 }}>
      <Header title="Profile" />

      <FlatList
        className="flex-1"
        data={profileItems}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={
          <View>
            <Text styleClassName="text-sm px-11 font-medium">Logged in as {user?.email}</Text>
          </View>
        }
      />
    </Screen>
  )
}
