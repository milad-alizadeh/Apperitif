import { Stack } from 'expo-router'

export default function Browse() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="recipes" />
    </Stack>
  )
}
