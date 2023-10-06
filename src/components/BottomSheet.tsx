import { BlurView } from 'expo-blur'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { shadowLarge } from '~/theme/shadows'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'

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
  const duration = 200
  const bottomInset = useSafeAreaInsetsStyle(['bottom'])
  const contentHeight = useRef(0)
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

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
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
      contentHeight.current = height
      offset.value = -contentHeight.current
    }
  }

  const gesture = Gesture.Pan()
    .onUpdate((event) => {})
    .onEnd((event) => {
      const threshold = 50
      if (event.velocityY > threshold) {
        runOnJS(hide)()
      }
    })

  return (
    <Modal transparent visible={visible} onRequestClose={hide} statusBarTranslucent>
      <TouchableOpacity onPress={hide}>
        <AnimatedBlurView
          animatedProps={intensityProp}
          tint="dark"
          className="w-full h-full items-center justify-center"
        >
          <Animated.View
            className="absolute bg-white w-screen top-full z-50 rounded-t-[50px] overflow-hidden"
            style={[bottomSheetStyle, shadowLarge]}
          >
            {/* Swip Area */}
            <GestureDetector gesture={gesture}>
              <View className="h-32 absolute top-0 left-0 w-full z-10"></View>
            </GestureDetector>

            <View onLayout={onContentLayout} className="min-h-[360px]" style={bottomInset}>
              {children}
            </View>
          </Animated.View>
        </AnimatedBlurView>
      </TouchableOpacity>
    </Modal>
  )
})
