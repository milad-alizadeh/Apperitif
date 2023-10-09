import { router, useLocalSearchParams } from 'expo-router'
import React, { useRef } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { FilterBar, FixedHeader, Screen, Text } from '~/components'
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
        recipes={recipes}
        styleClassName="pt-12 px-6 flex-1 -mx-3"
        onScroll={scrollHandler}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListHeaderComponent={<FilterBar autofocus={!categoryIds} styleClassName="-mx-3 mb-6" />}
        ListEmptyComponent={
          <View>
            {!!error && <Text>{error?.message}</Text>}
            <ActivityIndicator animating={loading} />
          </View>
        }
        onEndReached={loadMore}
      />
    </Screen>
  )
}
