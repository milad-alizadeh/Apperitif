import { Stack } from 'expo-router'
import React from 'react'

export default function MyBarStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-ingredients" options={{ presentation: 'modal' }} />
    </Stack>
  )
}
