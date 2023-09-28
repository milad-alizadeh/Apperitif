import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { Modal, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'
import { shadowLarge } from '~/theme/shadows'

export interface BottomSheetRef {
  show: () => void
  hide: () => void
}

export interface BottomSheetProps {
  children: React.ReactNode
}

export const BottomSheet = forwardRef(function BottomSheet({ children }: BottomSheetProps, ref) {
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
        <View onLayout={onContentLayout} style={bottomInset}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  )
})
