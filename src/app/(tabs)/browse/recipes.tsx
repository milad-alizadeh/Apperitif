import { router, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useRef } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Card, FilterBar, FixedHeader, Screen, Text } from '~/components'
import { RecipeGrid } from '~/components/RecipeGrid'
import { useFetchRecipes } from '~/hooks/useFetchRecipe'

export default function RecipesScreen() {
  const { categoryIds } = useLocalSearchParams()
  const scrollY = useSharedValue(0)
  const listRef = useRef(null)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })
  const { recipes, pageInfo, loading, error, manualRefresh, refreshing, loadMore } =
    useFetchRecipes(categoryIds)

  const renderItem = useCallback(({ item }: { item; index: number }) => {
    return (
      <Card
        {...item}
        key={item.id}
        onPress={() =>
          router.push({ pathname: '/recipe/[recipeId]', params: { recipeId: item.id } })
        }
        styleClassName="w-1/2 px-3 mb-6"
      />
    )
  }, [])

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top']}
      KeyboardAvoidingViewProps={{ enabled: false }}
      contentContainerStyle={{ flex: 1 }}
    >
      <TouchableOpacity
        className="h-8 w-40 absolute mx-auto right-[50%] -top-1 translate-x-20 z-20"
        onPress={() => listRef?.current?.scrollToTop()}
      />

      <FixedHeader
        scrollY={scrollY}
        offset={10}
        title={pageInfo?.totalCount ? pageInfo?.totalCount + ' Recipes' : ''}
        onGoBack={() => router.back()}
        alwaysShow
      />

      <RecipeGrid
        ref={listRef}
        data={recipes}
        className="pt-12 px-6 flex-1 -mx-3"
        onScroll={scrollHandler}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListHeaderComponent={<FilterBar autofocus={!categoryIds} styleClassName="-mx-3 mb-6" />}
        ListEmptyComponent={() => {
          {
            error && <Text>{error?.message}</Text>
          }
          return <ActivityIndicator animating={loading} />
        }}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListFooterComponent={<View className="h-20"></View>}
      />
    </Screen>
  )
}
