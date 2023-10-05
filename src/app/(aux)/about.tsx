import * as Application from 'expo-application'
import { Image } from 'expo-image'
import { View } from 'react-native'
import { Header, Screen, Text } from '~/components'

export default function FAQs() {
  const version = Application.nativeBuildVersion
  const versionCode = Application.applicationName

  return (
    <Screen preset="scroll" safeAreaEdges={['top']} contentContainerStyle={{ flex: 1 }}>
      <Header title="About" backButton />
      <View className="px-6 justify-center items-center flex-1">
        <View className="-translate-y-28 items-center">
          <Image className="w-56 h-56" source={require('~assets/images/logo.png')} />
          <Text h3 styleClassName="mb-2">
            Version: {version}
          </Text>
          <Text styleClassName="mb-2">
            © {new Date().getFullYear()} Bubblewrap Technologies LTD
          </Text>
        </View>
      </View>
    </Screen>
  )
}
