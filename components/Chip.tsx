import { useHaptic } from '~/hooks/useHaptics'
import { colors } from '~/theme'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Text, View } from 'react-native'

import { Icon } from './Icon'

export interface ChipProps {
  /**
   * An optional style override useful for padding & margin.
   */
  styleClassName?: string

  /**
   * An optional style override useful for padding & margin.
   */
  label: string

  /**
   * An optional style override useful for padding & margin.
   */
  onDismiss?: () => void
}

/**
 * Describe your component here
 */
export const Chip = observer(function Chip({ label, onDismiss, styleClassName }: ChipProps) {
  const haptic = useHaptic('light')
  return (
    <View className={`flex-row rounded-lg bg-primary items-center px-2 h-8 ${styleClassName}`}>
      <Text className="mr-2 text-white font-medium text-sm">{label}</Text>
      <Icon
        icon="closeFilled"
        color={colors.white}
        size="xsmall"
        onPress={() => {
          haptic()
          onDismiss()
        }}
      />
    </View>
  )
})
