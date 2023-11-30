import { useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'
import {
  BottomSheet,
  BottomSheetRef,
  Button,
  Header,
  InfoBox,
  IngredientDetails,
  ListItem,
  RecipeGrid,
  Screen,
  SectionList,
  Tabs,
  Text,
} from '~/components'
import { GET_MEASUREMENTS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useMatchedRecipes } from '~/hooks/useMatchedRecipes'
import { useSession } from '~/hooks/useSession'
import { useUpdateCache } from '~/hooks/useUpdateCache'

export default function MyBarScreen() {
  const isFocused = useIsFocused()
  const { user } = useSession()
  const modalRef = useRef<BottomSheetRef>(null)
  const [ingredientId, setIngredientId] = useState<string>('')
  const { capture } = useAnalytics()

  const { data, loading, error } = useQuery(GET_MEASUREMENTS)
  const updateCache = useUpdateCache()

  const handleIngredientPress = useCallback((ingredientId: string) => {
    setIngredientId(ingredientId)
    modalRef.current.show()
  }, [])

  const {
    deleteFromMyBar,
    getRecipeMatch,
    ingredientRefetch,
    ingredientLoading,
    partialMatchData,
    partialMatchLoading,
    partialMatchRefetch,
    sectionsData,
    sectionsHeader,
    totalMatchData,
    totalMatchLoading,
    totalMatchRefetch,
  } = useMatchedRecipes()

  const renderIngredientItem = useCallback(
    ({ item }) => {
      if (!item.name) return <View className="w-full h-64 bg-white p-page-spacing" />
      return (
        <ListItem
          leftImage={item.imageUrl}
          rightIcon="trash"
          name={item.name}
          styleClassName="mx-6"
          card
          testID="bar-ingredient-list-item"
          testIDIconRight="bar-ingredient-list-item-delete"
          onPress={() => {
            capture('my_bar:ingredient_info_press', { ingredient_name: item.name })
            handleIngredientPress(item.id)
          }}
          onRightIconPress={() => {
            deleteFromMyBar({
              variables: { ingredientIds: [item.id], profileIds: [user?.id] },
              onCompleted: () => {
                capture('my_bar:ingredient_remove', { ingredient_name: item.name })
                ingredientRefetch()
                totalMatchRefetch()
                partialMatchRefetch()
              },
            })
          }}
        />
      )
    },
    [sectionsData],
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={['top']}>
      {/* List of ingredients in the bar */}
      <Header
        title="My Bar"
        rightElement={
          <Button
            testID="add-ingredients-button"
            large={false}
            label="Add Ingredients"
            onPress={() => {
              capture('my_bar:add_ingredients_press')
              router.push('/add-ingredients')
            }}
          />
        }
      />

      <Tabs
        styleClassName="flex-1"
        onTabChange={(title) => {
          if (!isFocused) return
          capture('my_bar:tab_change', { tab_name: title })
        }}
      >
        <Tabs.TabPage title="Ingredients" styleClassName="p-0">
          <SectionList
            sectionsData={sectionsData}
            sectionsHeader={sectionsHeader}
            renderItem={renderIngredientItem}
            headerHeight={200}
            ListFooterComponent={<View />}
            contentContainerStyle={{ marginTop: -16 }}
            ListEmptyComponent={
              <View className="flex-1 justify-center w-full">
                {ingredientLoading ? (
                  <ActivityIndicator />
                ) : (
                  <View testID="empty-bar" className="w-full justify-center items-center mt-8">
                    <Text h3 styleClassName="text-center max-w-[220px] mb-3">
                      Uh-oh, your bar is drier than a Martini!
                    </Text>
                    <Text styleClassName="text-center" body>
                      Add some ingredients to get shaking.
                    </Text>
                  </View>
                )}
              </View>
            }
          />
        </Tabs.TabPage>

        <Tabs.TabPage title="Recipes" styleClassName="p-0">
          <RecipeGrid
            styleClassName="px-6"
            recipes={getRecipeMatch(totalMatchData)}
            onRefresh={() => totalMatchRefetch()}
            refreshing={totalMatchLoading}
            ListHeaderComponent={
              !data?.totalMatchInfoBoxDismissed ? (
                <InfoBox
                  styleClassName="m-3"
                  description="Explore cocktail recipes you can make with your current ingredients."
                  onClose={() =>
                    updateCache(GET_MEASUREMENTS, { totalMatchInfoBoxDismissed: true })
                  }
                />
              ) : (
                <View className="h-6"></View>
              )
            }
            ListEmptyComponent={
              !totalMatchLoading && (
                <View className="w-full flex-1 justify-center items-center mt-8">
                  <Text h3 styleClassName="text-center max-w-[280px] mb-3">
                    Add more ingredients to get recipe suggestions.
                  </Text>
                </View>
              )
            }
          />
        </Tabs.TabPage>

        <Tabs.TabPage title="Near-Ready Recipes" styleClassName="p-0">
          <RecipeGrid
            styleClassName="px-6"
            recipes={getRecipeMatch(partialMatchData)}
            onRefresh={() => partialMatchRefetch()}
            refreshing={partialMatchLoading}
            ListHeaderComponent={
              !data?.partialMatchInfoBoxDismissed ? (
                <InfoBox
                  styleClassName="m-3"
                  description="See which cocktails you're close to making with just 1-2 more ingredients."
                  onClose={() =>
                    updateCache(GET_MEASUREMENTS, { partialMatchInfoBoxDismissed: true })
                  }
                />
              ) : (
                <View className="h-6"></View>
              )
            }
            ListEmptyComponent={
              !partialMatchLoading && (
                <View className="w-full justify-center items-center mt-8">
                  <Text h3 styleClassName="text-center max-w-[280px] mb-3">
                    Add more ingredients to get recipe suggestions.
                  </Text>
                </View>
              )
            }
          />
        </Tabs.TabPage>
      </Tabs>

      {/* Ingredient details Modal */}
      <BottomSheet ref={modalRef}>
        <IngredientDetails ingredientId={ingredientId} />
      </BottomSheet>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
