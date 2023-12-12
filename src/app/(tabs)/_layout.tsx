import { Tabs } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '~/components/Icon'
import { useProtectedListener } from '~/hooks/useProtectedRouteListener'
import { colors } from '~/theme/colors'
import { shadowLarge } from '~/theme/shadows'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const { colorScheme } = useColorScheme()
  const backgroundColor = colorScheme === 'dark' ? colors.neutral[800] : colors.white

  const { protectedRoute } = useProtectedListener()

  return (
    <Tabs
      initialRouteName="Browse"
      screenOptions={{
        headerTintColor: colors.neutral[800],
        headerShown: false,
        headerStyle: {
          backgroundColor,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarItemStyle: {
          paddingVertical: 12,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor,
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
        options={{
          tabBarTestID: 'profile-tab',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Icon icon="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
