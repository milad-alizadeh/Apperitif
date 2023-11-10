import React, { FC } from 'react'
import { Text, View } from 'react-native'

export interface BadgeProps {
  /** Label to show */
  label: string
  /** Custom style class name */
  styleClassName?: string
}

/**
 * Badge component
 */
export const Badge: FC<BadgeProps> = ({ label, styleClassName }) => {
  return (
    <View
      testID="badge"
      className={`w-6 h-6 bg-primary rounded-full items-center justify-center ${styleClassName}`}
    >
      <Text className="text-white text-sm font-bold">{label}</Text>
    </View>
  )
}
