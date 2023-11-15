import React, { useEffect, useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { colors } from '~/theme/colors'
import { Text } from './Text'

export interface TextFieldProps {
  /**
   * An optional style override useful for padding & margin.
   */
  styleClassName?: string
  password?: boolean
  value: string
  placeholder?: string
  label?: string
  autoCapitalize?: TextInputProps['autoCapitalize']
  onChange: (value: string) => void
  onBlur?: () => void
  keyboardType?: TextInputProps['keyboardType']
  testID?: string
}

/**
 * Describe your component here
 */
export const TextField = function TextField({
  onBlur,
  onChange,
  value,
  password,
  styleClassName,
  placeholder,
  label,
  autoCapitalize,
  keyboardType,
  testID,
}: TextFieldProps) {
  const [localValue, setLocalValue] = useState('')

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <View>
      {label && <Text styleClassName="mb-2 text-base font-medium">{label}</Text>}
      <TextInput
        testID={testID}
        placeholder={placeholder}
        className={`${styleClassName} text-base border-[1px] border-neutral-300 rounded-lg p-3 leading-5`}
        secureTextEntry={password}
        placeholderTextColor={colors.neutral[400]}
        onChangeText={onChange}
        onBlur={onBlur}
        value={localValue}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  )
}
