import { BlurView } from 'expo-blur'
import React, { FC, ReactNode, Ref, forwardRef, useImperativeHandle, useState } from 'react'
import { KeyboardAvoidingView, Modal, Pressable, View, useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
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
  ref?: Ref<PromptRef>
  children?: ReactNode
  onDismiss?: () => void
  showCancel?: boolean
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const Prompt: FC<PromptProps> = forwardRef(
  (
    {
      cancelText = 'Cancel',
      confirmText = 'Confirm',
      title,
      description,
      onCancel,
      onConfirm,
      children,
      onDismiss,
      showCancel = true,
    },
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

    return (
      <Modal transparent={true} visible={visible} onRequestClose={hide}>
        <AnimatedBlurView
          animatedProps={intensityProp}
          tint="dark"
          className="w-full h-full items-center justify-center"
        >
          <Pressable
            onPress={() => {
              hide()
              onDismiss?.()
            }}
          >
            <View className="left-0 top-0 h-screen w-screen absolute" />
          </Pressable>

          <KeyboardAvoidingView behavior={'padding'}>
            <Animated.View
              className=" bg-white p-6 top-0 left-0 w-80 rounded-2xl"
              style={[translateStyle, shadowLarge]}
            >
              {children ? (
                <View>{children}</View>
              ) : (
                <View className="mb-6">
                  <Text h2 styleClassName="mb-3">
                    {title}
                  </Text>
                  <Text body>{description}</Text>
                </View>
              )}

              <View className="flex-row justify-between items-center mt-auto -mx-2">
                <View className="px-2 flex-1">
                  <Button
                    large={false}
                    label={confirmText}
                    onPress={() => {
                      onConfirm?.()
                    }}
                  />
                </View>
                {showCancel && (
                  <View className="px-2 flex-1">
                    <Button
                      label={cancelText}
                      outline
                      large={false}
                      onPress={() => {
                        onCancel?.()
                      }}
                    />
                  </View>
                )}
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </AnimatedBlurView>

        {/* <View className="w-full h-full items-center justify-center"></View> */}
      </Modal>
    )
  },
)
