import { useReactiveVar } from '@apollo/client'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import React, { FC, Ref, forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnalytics } from '~/hooks/useAnalytics'
import { searchQueryVar } from '~/store'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'
import { Card, CardProps } from './Card'
import { ListItem } from './ListItem'
import { Text } from './Text'

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
  ref?: Ref<any>
  renderAsList?: boolean
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
      renderAsList = false,
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

    const renderListItem = useCallback(
      ({ item }) => {
        if (!item.name)
          return (
            <View className="w-full">
              <Text h3 styleClassName="px-6 pb-4 pt-8 h-20">
                {item.title}
              </Text>
            </View>
          )
        if (!item?.imageUrl) return null
        return (
          <ListItem
            leftImage={getImageUrl(item.imageUrl, imageSizes.THUMBNAIL)}
            name={item.name}
            styleClassName="mx-6 mb-3"
            testID="favourite-recipe"
            testIDIconRight="favourite-recipe-delete"
            card
            onPress={() => {
              capture('my-bar:recipe_press', {
                recipe_name: item.name,
              })
              router.push({
                pathname: '/recipe',
                params: { recipeId: item.id, recipeName: item.name },
              })
            }}
          />
        )
      },
      [recipes],
    )

    const renderCardItem = useCallback(
      ({ item, index }: { item; index: number }) => {
        return (
          <View className={`w-full mb-3 ${index % 2 === 1 ? 'pr-6 pl-3' : 'pl-6 pr-3'}`}>
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
      [recipes],
    )

    const AnimatedFlashList = Animated.createAnimatedComponent(FlashList)

    return (
      <AnimatedFlashList
        ref={listRef}
        data={recipes}
        numColumns={renderAsList ? 1 : 2}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        removeClippedSubviews={true}
        className={`${styleClassName}`}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        estimatedItemSize={200}
        getItemType={(item) => {
          return !item.name ? 'sectionHeader' : 'row'
        }}
        renderItem={renderAsList ? renderListItem : renderCardItem}
        ListFooterComponent={ListFooterComponent ?? <View className="h-20"></View>}
        ListEmptyComponent={ListEmptyComponent}
      />
    )
  },
)
