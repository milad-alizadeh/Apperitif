import { router } from 'expo-router'
import React, { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Header } from './Header'
import { Markdown } from './Markdown'
import { Screen } from './Screen'

interface SimplePageProps {
  title: string
  content: string
  loading?: boolean
}

export const SimplePage: FC<SimplePageProps> = ({ title, content, loading }) => {
  return (
    <Screen preset="scroll" safeAreaEdges={['top']}>
      {true ? (
        <View className="h-screen items-center justify-center">
          <ActivityIndicator className="-mt-32" />
        </View>
      ) : (
        <View>
          <Header backButton title={title} styleClassName="min-h-[24px]" />
          <View className="px-6">
            <Markdown text={content} />
          </View>
        </View>
      )}
    </Screen>
  )
}
