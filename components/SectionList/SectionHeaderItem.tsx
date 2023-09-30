import React, { forwardRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from '../Text'

export interface SectionHeaderItemProps {
  label: string
  active: boolean
  onPress: () => void
  onLayout?: (event: any) => void
}

/**
 * Describe your component here
 */
export const SectionHeaderItem = forwardRef<View, SectionHeaderItemProps>(
  function SectionHeaderItem({ label, active, onPress, onLayout }: SectionHeaderItemProps, ref) {
    return (
      <View ref={ref} className="ml-6" onLayout={onLayout}>
        <TouchableOpacity className="pt-3 pb-2" onPress={onPress}>
          <Text
            styleClassName={`${
              active ? 'text-primary' : 'text-neutral-[400]'
            } text-base font-medium `}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    )
  },
)
