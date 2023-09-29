import React from 'react'
import { Stack } from 'expo-router'

export default function AuthModal {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="otp-email" />
      <Stack.Screen name="otp-verify" />
    </Stack>
  )
}
