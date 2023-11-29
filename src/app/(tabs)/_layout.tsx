import { Tabs } from 'expo-router'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '~/components/Icon'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useProtectedListener } from '~/hooks/useProtectedRouteListener'
import { colors } from '~/theme/colors'
import { shadowLarge } from '~/theme/shadows'

export default function TabLayout() {
  const { screen } = useAnalytics()
  const insets = useSafeAreaInsets()

  const { protectedRoute } = useProtectedListener()

  return (
    <Tabs
      initialRouteName="Browse"
      screenOptions={{
        headerTintColor: colors.neutral[800],
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.white,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarItemStyle: {
          paddingVertical: 12,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.white,
          height: 72 + insets.bottom,
          ...shadowLarge,
        },
        tabBarLabelStyle: {
          marginTop: 8,
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="browse"
        listeners={{
          tabPress: () => screen('browse:home_screen_view'),
        }}
        options={{
          tabBarTestID: 'browse-tab',
          tabBarLabel: 'Browse',
          tabBarIcon: ({ color }) => <Icon icon="cocktail" color={color} />,
        }}
      />

      <Tabs.Screen
        name="my-bar"
        listeners={protectedRoute}
        options={{
          tabBarTestID: 'my-bar-tab',
          tabBarLabel: 'My Bar',
          tabBarIcon: ({ color }) => <Icon icon="bar" color={color} />,
        }}
      />

      <Tabs.Screen
        name="favourites"
        listeners={protectedRoute}
        options={{
          tabBarTestID: 'favourites-tab',
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color }) => <Icon icon="bookmark" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        listeners={{
          tabPress: () => screen('profile:profile_screen_view'),
        }}
        options={{
          tabBarTestID: 'profile-tab',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Icon icon="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
