import { useNavigation } from '@react-navigation/native'
import { Icon, Text } from '~/components'
import { colors } from '~/theme'
import * as React from 'react'
import { View } from 'react-native'

export interface HeaderProps {
  title: string
  backButton?: boolean
  onClose?: () => void
  verticalPadding?: boolean
  rightElement?: React.ReactNode
}

/**
 * Describe your component here
 */
export const Header = function Header({
  title,
  backButton,
  onClose,
  verticalPadding,
  rightElement,
}: HeaderProps) {
  const navigation = useNavigation()

  return (
    <View
      className={`flex-row items-center justify-between px-6 ${verticalPadding ? 'py-6' : ''} ${
        rightElement ? 'pb-3' : ''
      }`}
    >
      {backButton && (
        <Icon
          icon="arrowLeft"
          color={colors.neutral[800]}
          onPress={() => navigation.goBack()}
          containerClassName="mr-4"
        />
      )}
      <Text h1 styleClassName="mr-auto">
        {title}
      </Text>
      {onClose && (
        <Icon
          icon="close"
          color={colors.neutral[800]}
          onPress={onClose}
          containerClassName="ml-4"
        />
      )}

      {rightElement}
    </View>
  )
}
