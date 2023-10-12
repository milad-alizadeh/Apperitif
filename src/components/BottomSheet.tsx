import { BlurView } from 'expo-blur'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native'
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
  const bottomInset = useSafeAreaInsets().bottom
  const contentHeight = useSharedValue(0)
  const blurIntensity = useSharedValue(0)
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
    }, duration)

    onHide && onHide()
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
          <View className="left-0 top-0 h-screen w-screen z-10" />
        </Pressable>

        <Animated.View
          style={[containerStyle, shadowLarge]}
          className="absolute bg-white w-screen top-full z-50 rounded-t-[50px] overflow-hidden"
        >
          <ScrollView>
            <View className="absolute right-6 top-6 z-20">
              <Icon icon="close" size="large" onPress={hide} />
            </View>
            {/* Swip Area */}
            <GestureDetector gesture={swipeGesture}>
              <View className="h-32absolute top-0 left-0 w-full z-10"></View>
            </GestureDetector>

            <View onLayout={onContentLayout} className="min-h-[360px]">
              {children}
              <View style={{ height: bottomInset }}></View>
            </View>
          </ScrollView>
        </Animated.View>
      </AnimatedBlurView>
    </Modal>
  )
})
