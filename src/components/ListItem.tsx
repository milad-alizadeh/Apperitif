import { Image } from 'expo-image'
import React, { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useHaptic } from '~/hooks/useHaptics'
import { colors } from '~/theme'
import { shadowCard } from '~/theme/shadows'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'
import { Badge } from './Badge'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { Icon, IconTypes } from './Icon'
import { Text } from './Text'

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
  /** Whether to use primary text color */
  primaryTextColor?: boolean
  /** Whether to display a checkbox */
  hasCheckbox?: boolean
  /** Whether to disable the checkbox */
  disableCheckbox?: boolean
  /** Whether to display an outline */
  outline?: boolean
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
  onLeftIconPress,
  onRightIconPress,
  onPress,
  badgeNumber,
  leftImage,
  enableHaptics = true,
  small,
  primaryTextColor,
  outline,
  checked,
  disableCheckbox,
}: ListItemProps) {
  const shadow = card ? shadowCard : {}
  const haptic = useHaptic('medium')

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        if (enableHaptics) haptic()
        onPress && onPress()
      }}
      className={`flex-row items-center justify-between flex
        ${card ? 'px-3 bg-neutral-100 rounded-xl' : ''}
        ${small ? 'h-10' : 'min-h-[48px]'}
        ${leftImage ? 'min-h-[64px]' : ''}
        ${styleClassName}
      `}
      style={{ ...shadow }}
    >
      {leftImage && (
        <Image
          source={{ uri: getImageUrl(leftImage, imageSizes.THUMBNAIL) }}
          className="w-16 h-16 rounded-l-xl mr-3 -ml-3"
          contentFit="cover"
          transition={500}
        />
      )}
      {showCheckbox && (
        <Checkbox
          onPress={() => {
            if (enableHaptics) haptic()
            onPress && onPress()
          }}
          disabled={disableCheckbox}
          checked={checked}
          styleClassName="mr-3"
        />
      )}
      {leftText && (
        <View className="mr-3 min-w-[80px]">
          <Text
            styleClassName={`font-medium text-base
            ${primaryTextColor ? 'text-primary' : ''}
          `}
          >
            {leftText}
          </Text>
        </View>
      )}
      {leftIcon && (
        <Icon
          containerClassName="mr-3"
          icon={leftIcon}
          color={colors.neutral[800]}
          onPress={onLeftIconPress}
        />
      )}
      <Text
        styleClassName={`flex-1 flex-wrap font-medium mr-auto
           ${small ? 'text-sm' : 'text-base'}
           ${primaryTextColor ? 'text-primary' : ''}
           ${outline ? 'underline' : ''}
           `}
      >
        {name}
      </Text>

      {rightIcon && (
        <Icon
          icon={rightIcon}
          color={colors.neutral[400]}
          onPress={
            onRightIconPress
              ? () => {
                  if (enableHaptics) haptic()
                  onRightIconPress()
                }
              : undefined
          }
        />
      )}

      {!!badgeNumber && (
        <Badge styleClassName="absolute -right-3 -top-3" label={`${badgeNumber}`} />
      )}
    </TouchableOpacity>
  )
})
