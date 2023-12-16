import React, { forwardRef } from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { Text } from '../../Text'

export interface SectionHeaderItemProps {
  label: string
  active?: boolean
  onPress?: () => void
  onLayout?: (event: any) => void
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const SectionHeaderItem = forwardRef<View, SectionHeaderItemProps>(
  function SectionHeaderItem(
    { label, active, onPress, onLayout, style }: SectionHeaderItemProps,
    ref,
  ) {
    return (
      <View ref={ref} className="ml-6" onLayout={onLayout} style={style}>
        <TouchableOpacity
          className="py-2"
          onPress={onPress}
          accessibilityState={{ selected: active }}
        >
          <Text
            body
            weight="medium"
            styleClassName={`
            text-center
            ${active ? 'text-primary' : 'text-neutral-[500]'}`}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    )
  },
)
