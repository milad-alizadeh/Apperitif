import { colors } from 'app/theme'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Icon } from './Icon'

export interface RecipeFavouriteProps {
  /**
   * An optional style override useful for padding & margin.
   */
  onDelete?: () => void
  onAdd?: () => void
  isFavourite: boolean
}

export const RecipeFavourite = observer(function RecipeFavourite({
  isFavourite,
  onDelete,
  onAdd,
}: RecipeFavouriteProps) {
  const [localIsFavourite, setLocalIsFavourite] = useState(isFavourite)
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const handlePress = () => {
    // Animate the scale
    scale.value = withTiming(
      1.2,
      {
        duration: 200, // You can control the duration of the animation
        easing: Easing.inOut(Easing.ease), // You can control the easing function
      },
      () => {
        scale.value = withTiming(1, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        })
      },
    )

    // Optimistically set the state
    setLocalIsFavourite(!localIsFavourite)
    localIsFavourite ? onDelete() : onAdd()
  }

  useEffect(() => {
    setLocalIsFavourite(isFavourite)
  }, [isFavourite])

  return (
    <Animated.View style={animatedStyle}>
      <Icon
        icon={localIsFavourite ? 'bookmarkFilled' : 'bookmark'}
        containerClassName="rounded-full bg-white"
        size="large"
        color={localIsFavourite ? colors.primary : colors.neutral[800]}
        activeOpacity={1}
        enableHaptics
        onPress={handlePress}
      />
    </Animated.View>
  )
})
