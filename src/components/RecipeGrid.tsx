import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import React, { FC, forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnalytics } from '~/hooks/useAnalytics'
import { searchQueryVar } from '~/store'
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
    const { capture } = useAnalytics()
    const search_term = useReactiveVar(searchQueryVar)

    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        listRef?.current?.scrollToOffset({ animated: true, offset: 0 })
      },
    }))

    const listRef = useRef(null)

    const renderItem = useCallback(
      ({ item }: { item; index: number }) => {
        return (
          <Card
            {...item}
            key={item.id}
            testID="recipe-card"
            onPress={() => {
              router.push({
                pathname: '/recipe',
                params: { recipeId: item.id, recipeName: item.name },
              })

              if (search_term.length > 0) {
                // Capture the search result event
                capture('browse:search_result_press', {
                  search_term,
                  characte_count: search_term.length,
                  selected_result: item.name,
                })
              } else {
                // Capture the recipe press event
                capture('browse:filter_recipe_press', {
                  recipe_name: item.name,
                })
              }
            }}
            styleClassName="w-1/2 px-3 mb-6"
          />
        )
      },
      [search_term],
    )

    return (
      <Animated.FlatList
        ref={listRef}
        data={recipes}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
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
