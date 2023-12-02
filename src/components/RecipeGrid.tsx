import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import React, { FC, Ref, forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
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
  loading?: boolean
  ref: Ref<any>
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
      loading,
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
      ({ item, index }: { item; index: number }) => {
        return (
          <View className={`w-1/2 mb-3 ${index % 2 === 1 ? 'pr-6 pl-3' : 'pl-6 pr-3'}`}>
            <Card
              {...item}
              key={item.id}
              testID="recipe-card"
              styleClassName="w-full"
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
            />
          </View>
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
        className={`${styleClassName}`}
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
