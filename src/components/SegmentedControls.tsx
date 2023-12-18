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
  accessibilityLabel?: string
}

type Props<T> = {
  segments: Segment<T>[]
  selectedValue?: Segment<T>['value']
  onValueChange: (value: Segment<T>['value']) => void
  testID: string
  disabled?: boolean
}

export const SegmentedControl = <T,>({
  segments,
  onValueChange,
  selectedValue,
  disabled,
  testID,
}: Props<T>) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1) // React state to keep track of active index
  const translateX = useSharedValue(0)
  const opacity = useSharedValue(0)
  const haptics = useHaptics('light')

  useEffect(() => {
    const newIndex = segments.findIndex((segment) => segment.value === selectedValue)
    if (containerWidth === 0 || newIndex === -1) return

    const segmentWidth = containerWidth / segments.length

    if (opacity.value === 0) {
      translateX.value = newIndex * segmentWidth
      opacity.value = 1
    } else {
      translateX.value = withTiming(newIndex * segmentWidth, {
        easing: Easing.inOut(Easing.ease),
        duration: 200,
      })
    }

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

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        easing: Easing.inOut(Easing.ease),
        duration: 200,
      }),
    }
  })

  return (
    <Animated.View
      testID={testID}
      style={opacityStyle}
      onLayout={handleLayout}
      className={`rounded-lg bg-neutral-200 ${disabled ? 'opacity-50' : ''}`}
    >
      <Animated.View
        className={`h-full ${disabled ? 'bg-neutral-500' : 'bg-primary'} absolute rounded-lg`}
        style={[{ width: `${100 / segments.length}%` }, animatedStyle, { ...shadowCard }]}
      />
      <View className="flex-row">
        {segments.map((segment, index) => (
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.5}
            key={segment.value.toString()}
            onPress={() => !disabled && handlePress(index, segment.value)}
            className="min-w-[38px] tems-center justify-center px-2 py-[5px]"
            accessibilityRole="radio"
            accessibilityLabel={segment.accessibilityLabel}
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
    </Animated.View>
  )
}
