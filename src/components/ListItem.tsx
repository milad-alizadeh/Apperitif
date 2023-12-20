import { Image } from 'expo-image'
import React, { memo } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useHaptics } from '~/hooks/useHaptics'
import { colors } from '~/theme'
import { shadowCard } from '~/theme/shadows'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'
import { Badge } from './Badge'
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
  /** Whether to disable the checkbox */
  disableCheckbox?: boolean
  /** Whether to display an outline */
  outline?: boolean
  /** Whether to display a loading skeleton */
  loading?: boolean
  /** Test ID for the component */
  testID?: string
  /** Test ID for the left text */
  testIDTextLeft?: string
  /** Test ID for the middle text */
  testIDTextMiddle?: string
  /** Test ID for the right icon */
  testIDIconRight?: string
  /** Test ID for the left icon */
  testIDIconLeft?: string
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
  testID,
  testIDTextLeft,
  testIDTextMiddle,
  testIDIconRight,
  testIDIconLeft,
  disableCheckbox,
  loading = false,
}: ListItemProps) {
  const shadow = card ? shadowCard : {}
  const haptic = useHaptics('medium')

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      testID={testID}
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
          styleClassName="mr-[14px]"
        />
      )}
      {leftText && (
        <View className="mr-3 min-w-[60px]">
          <Text
            testID={testIDTextLeft}
            body
            weight="medium"
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
          testID={testIDIconLeft}
          containerClassName="mr-3"
          icon={leftIcon}
          color={colors.neutral[500]}
          onPress={onLeftIconPress}
        />
      )}
      <Text
        testID={testIDTextMiddle}
        body={!small}
        weight="medium"
        styleClassName={`flex-1 flex-wrap mr-auto
           ${small ? 'text-sm' : 'text-base'}
           ${primaryTextColor ? 'text-primary' : ''}
           ${outline ? 'underline' : ''}
        `}
      >
        {name}
      </Text>

      {rightIcon && (
        <>
          {loading && (
            <ActivityIndicator className="absolute right-[14px] top-1/2 -translate-y-[10px]" />
          )}
          <Icon
            testID={testIDIconRight}
            icon={rightIcon}
            size="large"
            color={colors.neutral[500]}
            containerClassName={`${loading ? 'opacity-0' : ''} -mr-2`}
            onPress={
              onRightIconPress
                ? () => {
                    if (enableHaptics) haptic()
                    onRightIconPress()
                  }
                : undefined
            }
          />
        </>
      )}

      {!!badgeNumber && (
        <Badge styleClassName="absolute -right-3 -top-3" label={`${badgeNumber}`} />
      )}
    </TouchableOpacity>
  )
})
