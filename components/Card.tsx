import React, { memo } from 'react'
import { Image, PixelRatio, TouchableOpacity, View } from 'react-native'
import { Text } from './Text'

export interface CardProps {
  imageUrl: string
  name: string
  id: string
  onPress?: () => void
  styleClassName?: string
  wide?: boolean
  half?: boolean
}

export const Card = memo(function Card({
  imageUrl,
  name,
  styleClassName,
  wide,
  onPress,
}: CardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`${wide ? 'w-40' : 'w-32'} ${styleClassName}`}
    >
      <View
        className={`overflow-hidden rounded-2xl bg-neutral-200 ${
          wide ? 'aspect-[4/3]' : 'aspect-square'
        }`}
      >
        <Image source={{ uri: imageUrl }} className="w-full h-full" />
      </View>
      <Text styleClassName="text-sm font-medium mt-2">{name}</Text>
    </TouchableOpacity>
  )
})
