import { BlurView } from 'expo-blur'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~/theme'
import { shadowLarge } from '~/theme/shadows'
import { Icon } from './Icon'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export interface BottomSheetRef {
  show: () => void
  hide: () => void
}

export interface BottomSheetProps {
  onHide?: () => void
  children: React.ReactNode
}

export const BottomSheet = forwardRef(function BottomSheet(
  { children, onHide }: BottomSheetProps,
  ref,
) {
  const [visible, setVisible] = useState(false)
  const offset = useSharedValue(0)
  const paddingTop = useSharedValue(0)
  const duration = 200
  const topInset = useSafeAreaInsets().top
  const windowHeight = useWindowDimensions().height
  const windowWidth = useWindowDimensions().width
  const bottomInset = useSafeAreaInsets().bottom
  const contentHeight = useSharedValue(0)
  const blurIntensity = useSharedValue(0)
  const [isReady, setIsReady] = useState(false)
  const animationConfig = {
    duration,
    easing: Easing.inOut(Easing.ease),
  }

  const show = () => {
    setVisible(true)
    blurIntensity.value = 30
  }

  const hide = () => {
    offset.value = 0
    blurIntensity.value = 0

    setTimeout(() => {
      setVisible(false)
      onHide && onHide()
    }, duration)

    setIsReady(false)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        show,
        hide,
      }
    },
    [],
  )

  const containerStyle = useAnimatedStyle(() => {
    return {
      paddingTop: withTiming(paddingTop.value, animationConfig),
      height: withTiming(contentHeight.value, animationConfig),
      transform: [
        {
          translateY: withTiming(offset.value, animationConfig),
        },
      ],
    }
  })

  const closeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(paddingTop.value > 0 ? 1 : 0, animationConfig),
    }
  })

  const intensityProp = useAnimatedProps(() => {
    return {
      intensity: withTiming(blurIntensity.value, animationConfig),
    }
  })

  const onContentLayout = (event: any) => {
    const height = event.nativeEvent.layout.height

    if (height > 0) {
      const isLargerThanWindow = height > windowHeight - topInset
      const newContentHeight = isLargerThanWindow ? windowHeight : height
      contentHeight.value = newContentHeight
      paddingTop.value = isLargerThanWindow ? topInset : 0
      offset.value = -newContentHeight
    }

    setIsReady(true)
  }

  const swipeGesture = Gesture.Pan().onEnd((event) => {
    const threshold = 50
    if (event.velocityY > threshold) {
      runOnJS(hide)()
    }
  })

  return (
    <Modal transparent visible={visible} onRequestClose={hide} statusBarTranslucent>
      <AnimatedBlurView
        animatedProps={intensityProp}
        tint="dark"
        className="w-full h-full items-center justify-center"
      >
        <Pressable onPress={hide}>
          <View className="left-0 top-0 h-screen w-screen" />
        </Pressable>

        {isReady && (
          <ActivityIndicator
            color={colors.white}
            className="absolute top-1/2 left-1/2 -translate-x-2 -translate-y-2"
          />
        )}
        <Animated.View
          style={[containerStyle, shadowLarge]}
          className="absolute bg-white w-screen top-full rounded-t-[50px] overflow-hidden"
        >
          <ScrollView>
            <View onLayout={onContentLayout}>
              <Animated.View
                style={closeStyle}
                className="z-10 justify-center items-center rounded-full absolute right-6 top-5"
              >
                <Icon icon="close" size="large" onPress={hide} />
              </Animated.View>
              {children}
              <View style={{ height: bottomInset }} />
            </View>
          </ScrollView>

          {/* Swip Area */}
          <GestureDetector gesture={swipeGesture}>
            <View
              className="h-32 absolute top-0 left-16 right-0 m-auto"
              style={{ width: windowWidth - 128 }}
            ></View>
          </GestureDetector>
        </Animated.View>
      </AnimatedBlurView>
    </Modal>
  )
})
