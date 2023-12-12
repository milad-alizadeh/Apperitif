import * as Application from 'expo-application'
import { Image } from 'expo-image'
import * as Updates from 'expo-updates'
import { View } from 'react-native'
import { Header, Screen, Text } from '~/components'

export default function AboutScreen() {
  const version = Application.nativeApplicationVersion
  const buildNumber = Application.nativeBuildVersion
  const appName = Application.applicationName

  return (
    <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={{ flex: 1 }}>
      <Header title="About" backButton />
      <View className="px-6 justify-center items-center flex-1">
        <View className="-translate-y-28 items-center">
          <Image className="w-56 h-56" source={require('~assets/images/logo.png')} />
          <Text body weight="bold">
            {appName} v{version} ({buildNumber})
          </Text>
          {!!Updates?.updateId && (
            <Text body styleClassName="mt-2 text-center" weight="bold">
              {Updates?.createdAt?.toString()}
            </Text>
          )}
          <Text styleClassName="mt-4">
            © {new Date().getFullYear()} Bubblewrap Technologies LTD
          </Text>
        </View>
      </View>
    </Screen>
  )
}
