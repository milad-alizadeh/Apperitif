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
  half,
}: CardProps) {
  const scale = PixelRatio.getFontScale()
  const fixedWidth = wide ? 170 : 128
  const width = half ? '50%' : fixedWidth * (scale > 1 ? scale * 1.2 : 1)
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ width }}
      className={`${styleClassName} `}
    >
      <View
        className={`overflow-hidden rounded-2xl mb-2 bg-neutral-200 ${
          wide ? 'aspect-[4/3]' : 'aspect-square'
        }`}
      >
        <Image source={{ uri: imageUrl }} className="w-full h-full" />
      </View>
      <Text styleClassName="text-sm font-medium">{name}</Text>
    </TouchableOpacity>
  )
})
