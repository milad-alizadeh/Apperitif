import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { colors } from '~/theme/colors'
import { Icon } from './Icon'

export interface CheckboxProps {
  checked?: boolean
  onPress?: (value: boolean) => void
  styleClassName?: string
}

/**
 * Describe your component here
 */
export const Checkbox = function Checkbox({ checked, onPress, styleClassName }: CheckboxProps) {
  return (
    <TouchableOpacity className={styleClassName} activeOpacity={1} onPress={() => onPress(checked)}>
      {checked ? (
        <Icon
          icon="check"
          size="small"
          containerClassName="rounded-full bg-primary"
          color={colors.white}
        />
      ) : (
        <View className="rounded-full w-6 h-6 p-1 border-2 border-neutral-400" />
      )}
    </TouchableOpacity>
  )
}