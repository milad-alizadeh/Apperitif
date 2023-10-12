import React, { forwardRef } from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { useHaptic } from '../hooks/useHaptics'

export interface ButtonProps {
  label: string
  onPress?: () => void
  outline?: boolean
  styleClassName?: string
  large?: boolean
  enableHaptics?: boolean
  loading?: boolean
}

/**
 * Describe your component here
 */
export const Button = forwardRef(function Button(
  { label, onPress, outline, styleClassName, large, enableHaptics, loading }: ButtonProps,
  ref: any,
) {
  const hapticSuccess = useHaptic('success')
  const hapticWarning = useHaptic('warning')
  return (
    <TouchableOpacity
      ref={ref}
      onPress={() => {
        if (enableHaptics) {
          outline ? hapticWarning() : hapticSuccess()
        }
        onPress && !loading && onPress()
      }}
      className={`rounded-xl border-2 border-primary justify-center items-center ${
        outline ? '' : 'bg-primary'
      } ${large ? 'h-12 px-4 py-2' : 'px-3 py-1'} ${styleClassName} `}
    >
      <Text
        className={`text-base font-medium 
        ${outline ? 'text-primary' : 'text-white'} 
        ${large ? 'text-xl' : ''}`}
      >
        {loading ? <ActivityIndicator color="white" size="small" /> : label}
      </Text>
    </TouchableOpacity>
  )
})
