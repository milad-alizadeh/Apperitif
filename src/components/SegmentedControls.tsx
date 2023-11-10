import 'nativewind'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useHaptics } from '~/hooks/useHaptics'
import { shadowCard } from '~/theme/shadows'
import { Text } from './Text'

type Segment<T> = {
  label: string
  value: T
}

type Props<T> = {
  segments: Segment<T>[]
  selectedValue?: Segment<T>['value']
  onValueChange: (value: Segment<T>['value']) => void
}

export const SegmentedControl = <T,>({ segments, onValueChange, selectedValue }: Props<T>) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1) // React state to keep track of active index
  const translateX = useSharedValue(0)
  const haptics = useHaptics('light')

  useEffect(() => {
    const newIndex = segments.findIndex((segment) => segment.value === selectedValue)
    if (containerWidth === 0 || newIndex === -1) return

    const segmentWidth = containerWidth / segments.length
    translateX.value = withTiming(newIndex * segmentWidth, {
      easing: Easing.inOut(Easing.ease),
      duration: 200,
    })
    setActiveIndex(newIndex)
  }, [selectedValue, segments, containerWidth])

  const handlePress = (index: number, value: T) => {
    haptics()
    const segmentWidth = containerWidth / segments.length
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
            className="min-w-[38px] tems-center justify-center px-2 py-[5px]"
          >
            <Text
              styleClassName={`text-sm font-medium text-center w-full ${
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
