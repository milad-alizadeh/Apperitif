import { Stack } from 'expo-router'

export default function Browse() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="home">
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="filtered-recipes" /> */}
      {/* <Stack.Screen name="filters" options={{ presentation: 'modal' }} /> */}
    </Stack>
  )
}
