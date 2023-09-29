import { useNavigation } from '@react-navigation/native'
import { router, useLocalSearchParams } from 'expo-router'
import React, { FC, useCallback, useRef } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Card, Filter, FixedHeader, Screen, Text } from '~/components'
import { useFetchRecipes } from '~/hooks/useFetchRecipe'

export default function FilteredRecipesScreen() {
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
        styleClassName="p-3"
        half
      />
    )
  }, [])

  return (
    <Screen preset="fixed" safeAreaEdges={['top']} KeyboardAvoidingViewProps={{ enabled: false }}>
      <TouchableOpacity
        className="h-8 w-40 absolute mx-auto right-[50%] -top-1 translate-x-20 z-20"
        onPress={() => listRef?.current?.scrollToOffset({ animated: true, offset: 0 })}
      />

      <FixedHeader
        scrollY={scrollY}
        offset={10}
        title={pageInfo?.totalCount ? pageInfo?.totalCount + ' Recipes' : ''}
        onGoBack={() => router.back()}
        styleClassName="-mt-3"
        alwaysShow
      />

      <Animated.FlatList
        ref={listRef}
        data={recipes}
        numColumns={2}
        windowSize={10}
        nestedScrollEnabled
        className="pt-12 px-6 -mx-3 -mt-3"
        onScroll={scrollHandler}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListHeaderComponent={<Filter autofocus={!categoryIds} styleClassName="py-3 -mx-3" />}
        ListEmptyComponent={() => {
          if (loading) return <ActivityIndicator />
          return <Text>{error?.message}</Text>
        }}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListFooterComponent={<View className="h-20"></View>}
      />
    </Screen>
  )
}
