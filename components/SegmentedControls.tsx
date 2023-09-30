import 'nativewind'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useHaptic } from '~/hooks/useHaptics'
import { shadowCard } from '~/theme/shadows'
import { Text } from './Text'

type Segment = {
  label: string
  value: string | number
}

type Props = {
  segments: Segment[]
  onValueChange: (value: Segment['value']) => void
}

export const SegmentedControl: React.FC<Props> = ({ segments, onValueChange }) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0) // React state to keep track of active index
  const translateX = useSharedValue(0)
  const haptics = useHaptic('light')

  const handlePress = (index: number, value: string | number) => {
    const segmentWidth = containerWidth / segments.length
    haptics()
    translateX.value = withTiming(index * segmentWidth, {
      easing: Easing.inOut(Easing.ease),
      duration: 200,
    })
    setActiveIndex(index)
    onValueChange(value)
  }

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  return (
    <View onLayout={handleLayout} className="rounded-lg bg-neutral-200">
      <Animated.View
        className="h-full bg-primary absolute rounded-lg"
        style={[{ width: `${100 / segments.length}%` }, animatedStyle, { ...shadowCard }]}
      />
      <View className="flex-row">
        {segments.map((segment, index) => (
          <TouchableOpacity
            key={segment.value.toString()}
            onPress={() => handlePress(index, segment.value)}
            className="flex-1 items-center justify-center p-2"
          >
            <Text
              styleClassName={`text-sm font-medium ${
                activeIndex === index ? 'text-white' : 'text-black'
              }`}
            >
              {segment.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
