import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { shadowLarge } from '~/theme/shadows'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'

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
  const opacity = useSharedValue(0)
  const duration = 200
  const bottomInset = useSafeAreaInsetsStyle(['bottom'])
  const contentHeight = useRef(0)

  const show = () => {
    setVisible(true)
    opacity.value = 1
  }

  const hide = () => {
    offset.value = 0
    opacity.value = 0

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
          translateY: withTiming(offset.value, {
            duration,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    }
  })

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration,
        easing: Easing.inOut(Easing.ease),
      }),
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
      <TouchableOpacity activeOpacity={1} onPress={hide}>
        <Animated.View
          className="absolute z-10 w-screen h-screen left-0 top-0 bg-black/40"
          style={backgroundStyle}
        ></Animated.View>
      </TouchableOpacity>

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
    </Modal>
  )
})
