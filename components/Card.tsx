import { Image } from 'expo-image'
import React, { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'
import { Text } from './Text'

export interface CardProps {
  imageUrl: string
  name: string
  id: string
  onPress?: () => void
  styleClassName?: string
  wide?: boolean
  half?: boolean
  center?: boolean
}

export const Card = memo(function Card({
  imageUrl,
  name,
  styleClassName,
  wide,
  onPress,
  center,
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
        <Image
          source={{ uri: getImageUrl(imageUrl, imageSizes.THUMBNAIL) }}
          className="w-full h-full"
          transition={500}
        />
      </View>
      <Text styleClassName={`text-sm font-medium mt-2 ${center ? 'text-center' : ''}`}>{name}</Text>
    </TouchableOpacity>
  )
})
