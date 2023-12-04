import React, { forwardRef } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { useHaptics } from '~/hooks/useHaptics'
import { Text } from '../Text'

export interface ButtonProps {
  /** label of the button */
  label: string
  /** onPress event */
  onPress?: () => void
  /** display button as outline */
  outline?: boolean
  /** custom style class name */
  styleClassName?: string
  /** display button as large */
  large?: boolean
  /** enable haptics when button is pressed */
  enableHaptics?: boolean
  /** display loading indicator */
  loading?: boolean
  /** testID for testing */
  testID?: string
}

/**
 * Button component
 */
export const Button = forwardRef(function Button(
  {
    label,
    onPress,
    outline,
    styleClassName,
    large = true,
    enableHaptics,
    loading,
    testID = 'button',
  }: ButtonProps,
  ref: any,
) {
  const haptics = useHaptics('light')

  return (
    <TouchableOpacity
      ref={ref}
      testID={testID}
      onPress={() => {
        if (enableHaptics) haptics()
        onPress && !loading && onPress()
      }}
      className={`rounded-xl border-2 border-primary justify-center items-center bg-blue-500
        ${outline ? 'bg-transparent' : 'bg-primary'}
        ${large ? 'h-12 px-4 py-2' : 'px-3 py-2'} 
        ${styleClassName}
      `}
    >
      <Text
        body
        weight="medium"
        styleClassName={`
        ${outline ? 'text-primary' : 'text-white'} 
        ${large ? 'text-xl' : ''}`}
      >
        {loading ? (
          <ActivityIndicator testID="loading-indicator" color="white" size="small" />
        ) : (
          label
        )}
      </Text>
    </TouchableOpacity>
  )
})
