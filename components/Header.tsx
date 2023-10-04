import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import { colors } from '~/theme'
import { Icon } from './Icon'
import { Text } from './Text'

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
      className={`flex-row items-center justify-between px-6 ${verticalPadding ? 'py-6' : 'h-16'} `}
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
