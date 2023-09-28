import { Stack } from 'expo-router'
import { View } from 'react-native'
export default function Browse() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="home">
      <Stack.Screen name="home" />
      {/* <Stack.Screen name="filtered-recipes" /> */}
      {/* <Stack.Screen name="filters" options={{ presentation: 'modal' }} /> */}
    </Stack>
  )
}
