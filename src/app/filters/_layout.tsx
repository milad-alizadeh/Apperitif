import { Stack } from 'expo-router'
import { colors } from '~/theme'
import typography from '~/theme/typography'

export default function FilterStack() {
  const detailsOptions: any = ({ route }) => ({ title: route.params.filterName })
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: typography.primary.bold,
        },
        headerTintColor: colors.black,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Filters' }} />
      <Stack.Screen name="details" options={detailsOptions} />
    </Stack>
  )
}
