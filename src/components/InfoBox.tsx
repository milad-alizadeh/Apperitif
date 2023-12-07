// functional react component called InfoBox in typescript
import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { colors } from '~/theme'
import { Icon } from './Icon'

export interface InfoBoxProps {
  styleClassName?: string
  description: string
  onClose?: () => void
  type?: 'error' | 'info'
}

export const InfoBox: FC<InfoBoxProps> = ({ styleClassName, description, onClose, type }) => {
  const isError = type === 'error'
  return (
    <View
      className={`bg-neutral-100 p-3 flex-row rounded-xl 
      ${isError ? 'bg-primary' : ''} 
      ${styleClassName}`}
    >
      <Icon
        icon="infoCircle"
        containerClassName="mr-2"
        color={isError ? colors.white : colors.neutral[500]}
      />
      <Text className={`flex-1 mt-[3px] text-base ${isError ? 'text-white' : ''}`}>
        {description}
      </Text>

      {onClose && (
        <Icon
          icon="close"
          onPress={onClose}
          containerClassName="-top-[1px]"
          color={colors.neutral[500]}
        />
      )}
    </View>
  )
}
