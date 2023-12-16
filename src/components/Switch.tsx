import React, { FC, useEffect, useState } from 'react'
import { Switch as RNSwitch } from 'react-native'
import { colors } from '~/theme'
import { isAndroid } from '~/utils'

interface SwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  testID: string
}

export const Switch: FC<SwitchProps> = ({ value, onValueChange, testID }) => {
  const [localValue, setLocalValue] = useState(false)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <RNSwitch
      className={`${isAndroid ? 'scale-110' : ''}`}
      testID={testID}
      trackColor={{ false: colors.neutral[200], true: colors.primary }}
      thumbColor={isAndroid ? colors.neutral[100] : colors.white}
      onValueChange={onValueChange}
      value={localValue}
    />
  )
}
