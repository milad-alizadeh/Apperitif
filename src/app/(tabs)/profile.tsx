import { router } from 'expo-router'
import React from 'react'
import { FlatList, Linking, View } from 'react-native'
import { Header, IconTypes, ListItem, Screen, Text } from '~/components'
import { useAnalytics } from '~/hooks'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services/api'
import * as WebBrowser from 'expo-web-browser'
import { END_USER_LICENCE_AGREEMENT_URL, PRIVACY_POLICY_URL } from '~/config'

interface ProfileItem {
  name: string
  icon: IconTypes
  route?: string
  slug: string
  onPress?: () => void
}

export default function ProfileHomeScreen() {
  const { user, isLoggedIn } = useSession()
  const { capture, reset } = useAnalytics()

  const profileItems: ProfileItem[] | null[] = [
    {
      name: 'FAQs',
      icon: 'chat',
      route: '/faqs',
      slug: 'faqs',
    },
    {
      name: 'About',
      icon: 'infoCircle',
      route: '/about',
      slug: 'about',
    },
    null,
    {
      name: 'End User Licence Agreement',
      icon: 'file',
      route: END_USER_LICENCE_AGREEMENT_URL,
      slug: 'terms_and_conditions',
    },
    {
      name: 'Privacy Policy',
      icon: 'file',
      route: PRIVACY_POLICY_URL,
      slug: 'privacy_policy',
    },
    null,
    {
      name: 'Contact',
      icon: 'mail',
      route: 'mailto:contact@bubblewrap.ai',
      slug: 'contact',
    },
    {
      name: isLoggedIn ? 'Sign Out' : 'Log in or create an account',
      icon: 'logOut',
      slug: isLoggedIn ? 'sign_out' : 'log_in',
      onPress: () => {
        capture(`profile:${isLoggedIn ? 'sign_out' : 'log_in'}_press`)
        isLoggedIn ? singOut() : router.push('/auth')
      },
    },
  ]

  if (isLoggedIn) {
    profileItems.unshift({
      name: 'Account',
      icon: 'user',
      route: '/account',
      slug: 'account',
    })
  }

  const singOut = async () => {
    await api.supabase.auth.signOut()
    reset()
    router.push('/browse')
  }

  const renderItem = ({ item }: { item: ProfileItem }) => {
    if (!item) return <View className="h-8" />
    const { name, icon, route } = item
    const mailLink = route?.includes('mailto')
    const externalLink = route?.includes('http')

    let onPress =
      item.onPress ||
      (() => {
        capture(`profile:${item.slug}_press`)
        router.push(route as any)
      })
    if (mailLink) {
      onPress = () => {
        capture(`profile:${item.slug}_press`)
        Linking.openURL(route as any)
      }
    }

    if(externalLink) {
      onPress = () => {
        capture(`profile:${item.slug}_press`)
        WebBrowser.openBrowserAsync(route)
      }
    }

    return (
      <ListItem
        name={name}
        styleClassName="mx-6 mb-3"
        leftIcon={icon}
        rightIcon="chevronRight"
        card
        testID={`profile-list-${item.slug}`}
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
