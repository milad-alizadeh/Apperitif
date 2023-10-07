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
  const { user, isLoggedIn } = useSession()
  const client = useApolloClient()

  const profileItems: ProfileItem[] | null[] = [
    isLoggedIn
      ? {
          name: 'Account',
          icon: 'user',
          route: `/${user?.id}/account`,
        }
      : undefined,
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
      name: isLoggedIn ? 'Sign Out' : 'Log in or create an account',
      icon: 'logOut',
      onPress: () => (isLoggedIn ? singOut() : router.push('/auth')),
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
    <Screen safeAreaEdges={['top']} contentContainerStyle={{ flex: 1 }}>
      <FlatList
        className="flex-1"
        data={profileItems}
        renderItem={renderItem}
        ListHeaderComponent={<Header title="Profile" />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={
          isLoggedIn && (
            <View>
              <Text styleClassName="text-sm px-11 font-medium">Logged in as {user?.email}</Text>
            </View>
          )
        }
      />
    </Screen>
  )
}
