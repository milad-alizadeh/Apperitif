import { useProtectedListener } from '../../hooks/useProtectedRouteListener'
import Icon from '../../components/Icon'
import { shadowLarge } from '../../theme/shadows'
import colors from '../../theme/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
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
        options={{
          headerTitle: 'Browse',
          tabBarIcon: ({ color }) => <Icon icon="cocktail" color={color} />,
        }}
      />

      {/* <Tabs.Screen
        name="MyBar"
        listeners={protectedRoute}
        options={{
          headerTitle: 'My Bar',
          tabBarIcon: ({ color }) => <Icon icon="bar" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Favourites"
        listeners={protectedRoute}
        options={{
          tabBarIcon: ({ color }) => <Icon icon="bookmark" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Profile"
        listeners={protectedRoute}
        options={{
          tabBarIcon: ({ color }) => <Icon icon="user" color={color} />,
        }}
      /> */}
    </Tabs>
  )
}
