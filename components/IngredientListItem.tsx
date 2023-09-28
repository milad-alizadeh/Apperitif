import { Icon, Text } from '~/components'
import { useHaptic } from '~/hooks/useHaptics'
import { colors } from '~/theme'
import { shadowCard } from '~/theme/shadows'
import React, { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'

/**
 * Props for the IngredientListItem component
 */
export interface IngredientListItemProps {
  name: string
  checked?: boolean
  onPress?: () => void
}

/**
 * A list item component that displays an icon, text, and optional checkbox.
 */
export const IngredientListItem = memo(function IngredientListItem({
  name,
  checked,
  onPress,
}: IngredientListItemProps) {
  const haptic = useHaptic('medium')
  return (
    <TouchableOpacity
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
      <Text styleClassName={`mr-auto ml-4 font-medium text-base`}>{name}</Text>
    </TouchableOpacity>
  )
})
