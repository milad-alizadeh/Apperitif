import { BlurView } from 'expo-blur'
import React, { FC, forwardRef, useImperativeHandle, useState } from 'react'
import { Modal, TouchableOpacity, View, useWindowDimensions } from 'react-native'
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
import { Button } from './Button'
import { Text } from './Text'

export interface PromptRef {
  show: () => void
  hide: () => void
}

export interface PromptProps {
  onConfirm?: () => void
  onCancel?: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const Prompt: FC<PromptProps> = forwardRef(
  (
    { cancelText = 'Cancel', confirmText = 'Confirm', title, description, onCancel, onConfirm },
    ref,
  ) => {
    const [visible, setVisible] = useState(false)
    const duration = 300
    const windowHeight = useWindowDimensions().height
    const initialOffset = windowHeight + 112
    const offset = useSharedValue(initialOffset)
    const blurIntensity = useSharedValue(0)

    const animationConfig = {
      duration,
      easing: Easing.inOut(Easing.ease),
    }

    const show = () => {
      setVisible(true)
      offset.value = 0
      blurIntensity.value = 20
    }

    const hide = () => {
      offset.value = initialOffset
      blurIntensity.value = 0

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

    const translateStyle = useAnimatedStyle(() => {
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

    const gesture = Gesture.Pan()
      .onUpdate((event) => {})
      .onEnd((event) => {
        const threshold = 50
        if (event.velocityY > threshold) {
          runOnJS(hide)()
        }
      })

    return (
      <Modal transparent={true} visible={visible} onRequestClose={hide}>
        <AnimatedBlurView
          animatedProps={intensityProp}
          tint="dark"
          className="w-full h-full items-center justify-center"
        >
          <Animated.View
            className=" bg-white p-6 top-0 left-0 w-80 rounded-2xl"
            style={[translateStyle, shadowLarge]}
          >
            {/* Swip Area */}
            <GestureDetector gesture={gesture}>
              <View className="h-32 absolute top-0 left-0 w-full z-10"></View>
            </GestureDetector>

            <View className="mb-6">
              <Text h2 styleClassName="mb-3">
                {title}
              </Text>
              <Text body>{description}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-auto -mx-2">
              <View className="px-2 flex-1">
                <Button
                  label={cancelText}
                  outline
                  onPress={() => {
                    onCancel?.()
                    hide()
                  }}
                />
              </View>
              <View className="px-2 flex-1">
                <Button
                  label={confirmText}
                  onPress={() => {
                    onConfirm?.()
                    hide()
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </AnimatedBlurView>

        {/* <View className="w-full h-full items-center justify-center"></View> */}
      </Modal>
    )
  },
)
