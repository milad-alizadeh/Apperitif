import { router, useLocalSearchParams } from 'expo-router'
import React, { useRef } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { FilterBar, FixedHeader, Screen, Text } from '~/components'
import { RecipeGrid } from '~/components/RecipeGrid'
import { useFetchRecipes } from '~/hooks/useFetchRecipes'

export default function RecipesScreen() {
  const { categoryIds, categoryName } = useLocalSearchParams()
  const listRef = useRef(null)

  const { recipes, pageInfo, loading, error, manualRefresh, refreshing, loadMore } =
    useFetchRecipes(categoryIds as string[], categoryName as string)

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top']}
      KeyboardAvoidingViewProps={{ enabled: true }}
      contentContainerStyle={{ flex: 1, paddingTop: 40 }}
    >
      <TouchableOpacity
        className="h-8 w-40 absolute mx-auto right-[50%] -top-1 translate-x-20 z-20"
        onPress={() => listRef?.current?.scrollToTop()}
      />

      <FixedHeader
        offset={10}
        title={pageInfo?.totalCount ? pageInfo?.totalCount + ' Recipes' : ''}
        onGoBack={() => router.back()}
        alwaysShow
      />

      <RecipeGrid
        ref={listRef}
        recipes={recipes}
        styleClassName="flex-1 pt-9"
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListFooterComponent={
          <View className="h-20 justify-center items-center mb-12">
            <ActivityIndicator animating={loading} />
          </View>
        }
        ListHeaderComponent={<FilterBar autofocus={!categoryIds} styleClassName="mb-3" />}
        ListEmptyComponent={
          <>
            {!loading && !error && (
              <View className="items-center py-6">
                <Text body weight="medium">
                  No recipes found
                </Text>
              </View>
            )}
            <View>{!!error && <Text>{error?.message}</Text>}</View>
          </>
        }
        onEndReached={loadMore}
      />
    </Screen>
  )
}
