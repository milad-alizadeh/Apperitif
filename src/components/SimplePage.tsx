import { router } from 'expo-router'
import React, { FC } from 'react'
import { View } from 'react-native'
import { Header } from './Header'
import { Markdown } from './Markdown'
import { Screen } from './Screen'

export const SimplePage: FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <Screen preset="scroll" safeAreaEdges={['top', 'bottom']}>
      <Header backButton styleClassName="min-h-[24px]" />
      <Header title={title} />
      <View className="px-6">
        <Markdown text={content} />
      </View>
    </Screen>
  )
}
