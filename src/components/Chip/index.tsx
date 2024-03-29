import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useHaptics } from '~/hooks/useHaptics'
import { colors } from '~/theme'
import { Icon } from '../Icon'

export interface ChipProps {
  /** An optional style override useful for padding & margin. */
  styleClassName?: string
  /** The label to display in the chip */
  label: string
  /** An optional function to be called when the close icon is pressed */
  onDismiss?: () => void
  /** Whether to enable haptics */
  enableHaptics?: boolean
  /** The testID to apply to the chip */
  testID?: string
  /** The testID to apply to the close icon */
  testIDText?: string
}

/**
 * A chip component to display a chip with a label and close icon
 */
export const Chip: FC<ChipProps> = ({
  label,
  onDismiss,
  styleClassName,
  enableHaptics,
  testID = 'chip',
  testIDText,
}) => {
  const haptic = useHaptics('light')
  return (
    <View
      testID={testID}
      className={`flex-row rounded-lg bg-primary items-center px-2 h-8 ${styleClassName}`}
    >
      <Text testID={testIDText} className="mr-2 text-white font-medium text-sm">
        {label}
      </Text>
      <Icon
        icon="closeFilled"
        color={colors.white}
        size="xsmall"
        testID="close-icon"
        onPress={() => {
          if (enableHaptics) haptic()
          onDismiss && onDismiss()
        }}
      />
    </View>
  )
}
