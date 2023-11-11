import { Image } from 'expo-image'
import React, { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'
import { Text } from '../Text'

export interface CardProps {
  /** The image url to display */
  imageUrl: string
  /** The name of the card */
  name: string
  /** The id of the card */
  id?: string
  /** The function to call when the card is pressed */
  onPress?: () => void
  /** The style class name to apply to the card */
  styleClassName?: string
  /** Whether the card should be wide */
  wide?: boolean
  /** Whether the name should be centered */
  center?: boolean
}

/**
 * A card component to display a card with an image and name
 */
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
      testID="card"
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
          testID="card-image"
        />
      </View>
      <Text styleClassName={`text-sm font-medium mt-2 ${center ? 'text-center' : ''}`}>{name}</Text>
    </TouchableOpacity>
  )
})
