import React, { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Header } from './Header'
import { Markdown } from './Markdown'
import { Screen } from './Screen'

interface SimplePageProps {
  /** The title of the page */
  title: string
  /** The content of the page */
  content: string
  /** Whether the page is loading */
  loading?: boolean
}

export const SimplePage: FC<SimplePageProps> = ({ title, content, loading }) => {
  return (
    <Screen preset="scroll" safeAreaEdges={['top', 'bottom']}>
      {loading ? (
        <View className="h-screen items-center justify-center">
          <ActivityIndicator className="-mt-32" />
        </View>
      ) : (
        <View>
          <Header backButton title={title} />
          <View className="px-6">
            <Markdown text={content} />
          </View>
        </View>
      )}
    </Screen>
  )
}
