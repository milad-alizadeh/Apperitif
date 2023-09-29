import { Stack } from 'expo-router'
import React from 'react'

export default function AuthModal() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="otp-email" />
      <Stack.Screen name="otp-verify" />
    </Stack>
  )
}
