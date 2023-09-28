import * as React from 'react'
import { View, Text } from 'react-native'

export interface BadgeProps {
  label: string
  styleClassName?: string
}

/**
 * Describe your component here
 */
export function Badge({ label, styleClassName }: BadgeProps) {
  return (
    <View
      className={`w-6 h-6 bg-primary rounded-full items-center justify-center ${styleClassName}`}
    >
      <Text className="text-white text-sm font-bold">{label}</Text>
    </View>
  )
}
