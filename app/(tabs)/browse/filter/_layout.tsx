import { Stack } from 'expo-router'

export default function FilterStack() {
  ;<Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="index" />
    <Stack.Screen name="[filterId]" />
  </Stack>
}
