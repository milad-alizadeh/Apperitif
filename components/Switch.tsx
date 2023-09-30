import React, { FC, useEffect, useState } from 'react'
import { Switch as RNSwitch } from 'react-native'
import { colors } from '~/theme'

interface SwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
}

export const Switch: FC<SwitchProps> = ({ value, onValueChange }) => {
  const [localValue, setLocalValue] = useState(false)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <RNSwitch
      trackColor={{ false: colors.neutral[200], true: colors.primary }}
      thumbColor={colors.white}
      onValueChange={onValueChange}
      value={localValue}
    />
  )
}
