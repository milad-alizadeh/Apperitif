import { useNavigation } from '@react-navigation/native'
import { AppleAuthentication, Icon, Text } from 'app/components'
import { AuthNavigatorProps, AuthNavigatorScreenProps } from 'app/navigators'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface AuthHomeScreenProps extends AuthNavigatorScreenProps<'AuthHome'> {}

export const AuthHomeScreen: FC<AuthHomeScreenProps> = observer(function AuthHomeScreen({ route }) {
  const { attemptedRoute } = route.params || {}
  const navigation = useNavigation<AuthNavigatorProps>()

  return (
    <View className="flex-1 p-6">
      <Icon
        icon="close"
        containerClassName="absolute top-6 right-6"
        onPress={() => navigation.goBack()}
      />

      <View>
        <View className="items-center my-8">
          <Image className="w-52 h-52" source={require('../../../assets/images/logo.png')} />
          <Text styleClassName="text-xl font-bold mb-2">Sign up or login to continue.</Text>
          <Text body>It only takes a moment.</Text>
        </View>

        <View className="items-center">
          <AppleAuthentication />
        </View>

        <View className="items-center my-8">
          <Text body styleClassName="bg-white -mb-[10] z-10 px-2">
            or
          </Text>
          <View className="w-full h-[1px] bg-neutral-300" />
        </View>

        <View className="items-center">
          <TouchableOpacity
            className="p-1"
            onPress={() => navigation.navigate('AuthOtpEmail', { attemptedRoute })}
          >
            <Text body styleClassName="text-neutral-800 font-bold underline underline-offset-3">
              Continue with Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})
