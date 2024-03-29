import { router } from 'expo-router'
import * as React from 'react'
import { View } from 'react-native'
import { colors } from '~/theme'
import { Icon } from './Icon'
import { Text } from './Text'

export interface HeaderProps {
  title?: string
  backButton?: boolean
  onClose?: () => void
  verticalPadding?: boolean
  rightElement?: React.ReactNode
  styleClassName?: string
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
  styleClassName,
}: HeaderProps) {
  return (
    <View
      className={`max-w-full flex-row items-center justify-between px-6 
        ${verticalPadding ? 'py-6' : 'min-h-[64px]'}
        ${styleClassName}
      `}
    >
      {backButton && (
        <Icon
          icon="arrowLeft"
          color={colors.neutral[800]}
          onPress={() => (router.canGoBack ? router.back() : router.push('/'))}
          containerClassName="mr-4"
          accessibilityHint='Navigates to the previous screen'
          accessibilityLabel='Go Back'
        />
      )}
      {title && (
        <Text h1 styleClassName="mr-auto">
          {title}
        </Text>
      )}

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
