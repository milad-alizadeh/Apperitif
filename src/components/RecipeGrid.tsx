import { router } from 'expo-router'
import React, { FC, forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Card, CardProps } from './Card'

interface RecipeGridProps {
  ListEmptyComponent?: JSX.Element
  ListFooterComponent?: JSX.Element
  ListHeaderComponent?: JSX.Element
  onEndReached?: () => void
  onRefresh?: () => void
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  recipes: CardProps[]
  refreshing?: boolean
  styleClassName?: string
}

export const RecipeGrid: FC<RecipeGridProps> = forwardRef(
  (
    {
      ListEmptyComponent,
      ListFooterComponent,
      ListHeaderComponent,
      onEndReached,
      onRefresh,
      onScroll,
      recipes,
      refreshing,
      styleClassName,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        listRef?.current?.scrollToOffset({ animated: true, offset: 0 })
      },
    }))

    const listRef = useRef(null)

    const renderItem = useCallback(({ item }: { item; index: number }) => {
      return (
        <Card
          {...item}
          key={item.id}
          testID="recipe-card"
          onPress={() =>
            router.push({ pathname: '/recipe/[recipeId]', params: { recipeId: item.id } })
          }
          styleClassName="w-1/2 px-3 mb-6"
        />
      )
    }, [])

    return (
      <Animated.FlatList
        ref={listRef}
        data={recipes}
        numColumns={2}
        windowSize={10}
        nestedScrollEnabled
        className={`-mx-3 ${styleClassName}`}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent ?? <View className="h-20"></View>}
        ListEmptyComponent={ListEmptyComponent}
      />
    )
  },
)
