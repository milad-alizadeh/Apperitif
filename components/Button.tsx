import { useHaptic } from '../hooks/useHaptics'
import * as React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

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
export default function Button({
  label,
  onPress,
  outline,
  styleClassName,
  large,
  enableHaptics,
  loading,
}: ButtonProps) {
  const hapticSuccess = useHaptic('success')
  const hapticWarning = useHaptic('warning')
  return (
    <TouchableOpacity
      onPress={() => {
        if (enableHaptics) {
          outline ? hapticWarning() : hapticSuccess()
        }
        onPress && !loading && onPress()
      }}
      className={`rounded-xl px-4 py-2 min-w-[100px] justify-center items-center ${
        outline ? 'border-2 border-primary' : 'bg-primary'
      } ${large ? 'h-12' : ''} ${styleClassName} `}
    >
      <Text
        className={`text-base ${outline ? 'text-primary' : 'text-white'} ${
          large ? 'text-xl font-medium' : ''
        }`}
      >
        {loading ? <ActivityIndicator color="white" size="small" /> : label}
      </Text>
    </TouchableOpacity>
  )
}
