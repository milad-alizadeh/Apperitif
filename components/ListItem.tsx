import { Badge, Checkbox, Icon, IconTypes, Text } from '~/components'
import { useHaptic } from '~/hooks/useHaptics'
import { colors } from '~/theme'
import { shadowCard } from '~/theme/shadows'
import React, { memo } from 'react'
import { Image, TouchableOpacity } from 'react-native'

/**
 * Props for the ListItem component
 */
export interface ListItemProps {
  /** Unique identifier for the item */
  id?: string
  /** Style class name to apply to the component */
  styleClassName?: string
  /** Icon to display on the left side of the item */
  leftIcon?: IconTypes
  /** Icon to display on the right side of the item */
  rightIcon?: IconTypes
  /** Text to display on the left side of the item */
  leftText?: string
  /** Whether to show a checkbox on the item */
  showCheckbox?: boolean
  /** name to display on the item */
  name: string
  /** Whether to display the item as a card */
  card?: boolean
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Number to display on the badge */
  badgeNumber?: number
  /** Function to call when the left icon is pressed */
  onLeftIconPress?: () => void
  /** Function to call when the right icon is pressed */
  onRightIconPress?: () => void
  /** Function to call when the item is pressed */
  onPress?: () => void
  /** Image to display on the left side of the item */
  leftImage?: string
  /** Whether to use a smaller version of the component */
  small?: boolean
  /** Whether to enable haptics when the item is pressed */
  enableHaptics?: boolean
}

/**
 * A list item component that displays an icon, text, and optional checkbox.
 */
export const ListItem = memo(function ListItem({
  rightIcon,
  leftIcon,
  name,
  leftText,
  styleClassName,
  card,
  showCheckbox,
  checked,
  onLeftIconPress,
  onRightIconPress,
  onPress,
  badgeNumber,
  leftImage,
  enableHaptics = true,
  small,
}: ListItemProps) {
  const shadow = card ? shadowCard : {}
  const haptic = useHaptic('medium')
  return (
    <TouchableOpacity
      onPress={() => {
        if (enableHaptics) haptic()
        onPress && onPress()
      }}
      className={`flex-row items-center justify-between ${small ? 'h-10' : 'h-12'} ${
        card ? 'px-3' : ''
      }
      } ${styleClassName} ${card ? 'bg-neutral-100 rounded-xl' : ''} ${leftImage ? 'h-16' : ''}`}
      style={{ ...shadow }}
    >
      {leftImage && (
        <Image
          source={{ uri: leftImage }}
          className="w-16 h-16 rounded-l-xl mr-3 -ml-3"
          style={{ resizeMode: 'cover' }}
        />
      )}
      {showCheckbox && <Checkbox checked={checked} onPress={onPress} styleClassName="mr-3" />}
      {leftText && (
        <Text styleClassName={`font-medium min-w-[80px] capitalize mr-3`}>{leftText}</Text>
      )}
      {leftIcon && (
        <Icon
          containerClassName="mr-3"
          icon={leftIcon}
          color={colors.neutral[500]}
          onPress={onLeftIconPress}
        />
      )}
      <Text styleClassName={`mr-auto font-medium ${small ? 'text-sm' : 'text-base'}`}>{name}</Text>

      {rightIcon && (
        <Icon
          icon={rightIcon}
          color={colors.neutral[500]}
          onPress={() => {
            if (enableHaptics) haptic()
            onRightIconPress && onRightIconPress()
          }}
        />
      )}

      {!!badgeNumber && (
        <Badge styleClassName="absolute -right-3 -top-3" label={`${badgeNumber}`} />
      )}
    </TouchableOpacity>
  )
})
