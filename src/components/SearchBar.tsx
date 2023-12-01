import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { colors } from '~/theme'
import { Icon } from './Icon'

export interface SearchBarProps {
  value?: string
  autofocus?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  testId?: string
  testIdClear?: string
}

/**
 * Describe your component here
 */
export const SearchBar = function SearchBar({
  value,
  onChange,
  onFocus,
  onBlur,
  autofocus,
  testId,
  testIdClear = 'search-bar-clear',
}: SearchBarProps) {
  const inputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setSearchQuery(value)
  }, [value])

  useEffect(() => {
    if (autofocus) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 550)
    }
  }, [])

  return (
    <View className="items-center flex-row flex-1 h-10">
      <Icon
        icon="search"
        containerClassName="z-10 w-6 h-6 mr-2 absolute left-2 top-2"
        color={colors.neutral[500]}
      />
      <TextInput
        testID={testId}
        ref={inputRef}
        placeholder="Search"
        placeholderTextColor={colors.neutral[500]}
        className="text-base h-10 leading-5 items-center bg-white pl-10 rounded-lg flex-1"
        value={searchQuery}
        onChangeText={(value) => {
          setSearchQuery(value)
          onChange?.(value)
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {!!searchQuery && (
        <Icon
          testID={testIdClear}
          icon="closeFilled"
          containerClassName="z-10 mr-2 absolute right-0"
          color={colors.neutral[500]}
          onPress={() => {
            setSearchQuery('')
            onChange?.('')
          }}
        />
      )}
    </View>
  )
}
