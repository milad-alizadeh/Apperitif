import React, { memo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useHaptics } from '~/hooks/useHaptics'
import { colors } from '~/theme'
import { shadowCard } from '~/theme/shadows'
import { Icon } from './Icon'

/**
 * Props for the IngredientListItem component
 */
export interface IngredientListItemProps {
  name: string
  checked?: boolean
  onPress?: () => void
  testID?: string
}

/**
 * A list item component that displays an icon, text, and optional checkbox.
 */
export const IngredientListItem = memo(function IngredientListItem({
  name,
  checked,
  onPress,
  testID,
}: IngredientListItemProps) {
  const haptic = useHaptics('medium')
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => {
        haptic()
        onPress()
      }}
      className={`flex-row items-center justify-between h-12 px-3 bg-neutral-100 rounded-xl`}
      style={{ ...shadowCard }}
    >
      {checked ? (
        <Icon
          icon="check"
          containerClassName="rounded-full bg-primary"
          size="small"
          color={colors.white}
        />
      ) : (
        <View className="rounded-full w-6 h-6 p-1 border-2 border-neutral-400" />
      )}
      <Text className={`mr-auto ml-4 font-medium text-base`}>{name}</Text>
    </TouchableOpacity>
  )
})
