import * as React from 'react'
import { Image, useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { SkeletonView } from './SkeletonView'

export interface BouncyImageProps {
  /** The height of the image */
  height: number
  /** The shared value of the scroll position */
  scrollY?: SharedValue<number>
  /** The URL of the image */
  imageUrl: string
}

/**
 * A component that renders an animated image that bounces as the user scrolls.
 */
export const BouncyImage = function BouncyImage({ height, scrollY, imageUrl }: BouncyImageProps) {
  return (
    <Animated.View
      className="aspect-square bg-neutral-300 w-full"
      style={[scrollY ? getBouncyTransform(scrollY, height) : {}, { height }]}
    >
      <Image
        className="w-full h-full"
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
      />
    </Animated.View>
  )
}

/**
 * Returns an animated style object that applies a bouncy transform to the image as the user scrolls.
 * @param scrollY - The shared value of the scroll position
 * @param headerHeight - The height of the header
 * @returns An animated style object
 */
const getBouncyTransform = (scrollY: SharedValue<number>, headerHeight: number) =>
  useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-headerHeight, 0], [2.2, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    })

    const translateY = interpolate(
      scrollY.value,
      [-headerHeight, 0, headerHeight],
      [-headerHeight / 2, 0, headerHeight / 2],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    )

    return {
      transform: [{ scale }, { translateY }],
    }
  })
