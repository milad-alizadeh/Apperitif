import { Image } from 'expo-image'
import * as React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'
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
  const [loaded, setLoaded] = React.useState(false)
  const width = useWindowDimensions().width
  return (
    <Animated.View
      className="bg-neutral-300 w-full"
      style={[scrollY ? getBouncyTransform(scrollY, height) : {}, { height }]}
    >
      {!loaded && (
        <SkeletonView
          style={{ position: 'absolute', left: 0, top: 0 }}
          visible={loaded}
          height={height}
          width={width}
        />
      )}
      <Image
        className="w-full h-full"
        transition={300}
        onLoad={() => {
          console.log('loaded')
          setLoaded(true)
        }}
        source={
          typeof imageUrl === 'string'
            ? { uri: getImageUrl(imageUrl, imageSizes.MEDIUM) }
            : imageUrl
        }
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
