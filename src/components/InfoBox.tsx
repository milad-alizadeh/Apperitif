// functional react component called InfoBox in typescript
import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { colors } from '~/theme'
import { Icon } from './Icon'

export interface InfoBoxProps {
  styleClassName?: string
  description: string
  onClose?: () => void
}

export const InfoBox: FC<InfoBoxProps> = ({ styleClassName, description, onClose }) => {
  return (
    <View className={`bg-neutral-100 p-3 flex-row rounded-xl ${styleClassName}`}>
      <Icon icon="infoCircle" containerClassName="mr-2 -top-[1px]" color={colors.neutral[500]} />
      <Text className="flex-1 text-base">{description}</Text>

      <Icon
        icon="close"
        onPress={onClose}
        containerClassName="-top-[1px]"
        color={colors.neutral[500]}
      />
    </View>
  )
}
