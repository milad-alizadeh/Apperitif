import React, { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { shadowHeader } from '~/theme/shadows'
import { useSafeAreaInsetsStyle } from '../utils/useSafeAreaInsetsStyle'
import { Icon } from './Icon'
import { Text } from './Text'

interface FixedHeaderProps {
  scrollY?: SharedValue<number>
  style?: ViewStyle
  title: string
  offset: number
  styleClassName?: string
  showTopInset?: boolean
  onGoBack: () => void
  alwaysShow?: boolean
  showShadow?: boolean
  rightElement?: ReactNode
}

export function FixedHeader({
  scrollY,
  title,
  offset,
  onGoBack,
  styleClassName,
  showTopInset,
  alwaysShow,
  showShadow = true,
  rightElement,
}: FixedHeaderProps) {
  const topInset = useSafeAreaInsetsStyle(['top'])

  const opacity = useSharedValue<number>(0)

  // Animated header background when scroll reaches certain offset
  if (scrollY) {
    useAnimatedReaction(
      () => {
        return scrollY.value
      },
      (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
          if (currentValue > offset) {
            opacity.value = withTiming(1, { duration: 200 })
          } else {
            opacity.value = withTiming(0, { duration: 200 })
          }
        }
      },
    )
  }

  const animatedStyle = offset
    ? useAnimatedStyle(() => ({
        opacity: opacity.value,
      }))
    : { opacity: 1 }

  return (
    <View
      style={showTopInset ? topInset : {}}
      className={`
        absolute top-0 left-0 right-0 z-10 items-center flex-row px-5 justify-between
        ${styleClassName}
      `}
    >
      {scrollY ? (
        <Animated.View
          className="top-0 left-0 right-0 bottom-0 absolute bg-white"
          style={[animatedStyle, showShadow ? shadowHeader : {}]}
        ></Animated.View>
      ) : (
        <View className="top-0 left-0 right-0 bottom-0 absolute bg-white" />
      )}

      <Icon
        icon="arrowLeft"
        size="large"
        containerClassName="rounded-full justify-center items-center bg-white "
        styleClassName="w-full h-full"
        onPress={() => onGoBack()}
        testID="back-button"
      />

      <Animated.View className="mx-auto" style={alwaysShow ? {} : animatedStyle}>
        <Text body weight="bold" styleClassName="text-center">
          {title}
        </Text>
      </Animated.View>

      <View className="right-0 top-0 min-w-[40px]">{rightElement}</View>
    </View>
  )
}
