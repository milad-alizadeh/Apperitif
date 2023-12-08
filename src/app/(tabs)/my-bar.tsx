import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'
import Popover from 'react-native-popover-view'
import {
  Button,
  Header,
  InfoBox,
  ListItem,
  RecipeGrid,
  Screen,
  SectionList,
  Tabs,
  Text,
} from '~/components'
import { useAnalytics, useMatchedRecipes, useSession } from '~/hooks'
import { useStore } from '~/providers'

export default function MyBarScreen() {
  const {
    myBarPopoverDismissed,
    totalMatchInfoBoxDismissed,
    partialMatchInfoBoxDismissed,
    setMyBarPopoverDismissed,
    setPartialMatchInfoBoxDismissed,
    setTotalMatchInfoBoxDismissed,
    setCurrentIngredientId,
  } = useStore()
  const isFocused = useIsFocused()
  const { user } = useSession()
  const { capture } = useAnalytics()
  const [deleteingItemId, setDeleteingItemId] = useState<string>('')

  const handleIngredientPress = useCallback((ingredientId: string) => {
    setCurrentIngredientId(ingredientId)
  }, [])

  const [showPopover, setShowPopover] = useState<number | null>(null)

  useEffect(() => {
    if (!myBarPopoverDismissed) {
      setShowPopover(1)
    }
  }, [myBarPopoverDismissed])

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
    ingredientError,
    totalMatchError,
    partialMatchError,
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
            capture('my_bar:ingredient_details_press', { ingredient_name: item.name })
            handleIngredientPress(item.id)
          }}
          leftIcon="text"
          loading={deleteingItemId === item.id}
          onRightIconPress={() => {
            deleteingItemId === item.id ? setDeleteingItemId('') : setDeleteingItemId(item.id)
            deleteFromMyBar({
              variables: { ingredientIds: [item.id], profileIds: [user?.id] },
              onCompleted: () => {
                capture('my_bar:ingredient_remove', { ingredient_name: item.name })
                ingredientRefetch()
                totalMatchRefetch()
                partialMatchRefetch()
                setDeleteingItemId('')
              },
            })
          }}
        />
      )
    },
    [sectionsData, deleteingItemId],
  )

  const partialRecipes = getRecipeMatch(partialMatchData)
  const totalRecipes = getRecipeMatch(totalMatchData)
  const allRecipes = [
    {
      title: `Cocktails you can make now (${totalRecipes?.length})`,
      id: 'total-match',
    },
    ...totalRecipes,
    {
      title: `Cocktails short of 1 or 2  (${partialRecipes?.length})`,
      id: 'partial-match',
    },
    ...partialRecipes,
  ]

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={['top']}>
      <Header
        title="My Bar"
        rightElement={
          <Popover
            popoverStyle={{ padding: 12, borderRadius: 12 }}
            isVisible={showPopover === 1}
            from={
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
            onRequestClose={() => setShowPopover(null)}
            onCloseComplete={() => setShowPopover(2)}
          >
            <Text body styleClassName="flex-wrap">
              Add ingredients to your bar
            </Text>
          </Popover>
        }
      />

      <View className="flex-1">
        <Popover
          isVisible={showPopover === 2}
          popoverStyle={{ padding: 12, borderRadius: 12 }}
          onRequestClose={() => {
            setShowPopover(null)
          }}
          onCloseComplete={() => {
            setMyBarPopoverDismissed(true)
            capture('my_bar:popover_dismiss')
          }}
          from={<View className="absolute h-6 w-6 left-1/2 -translate-x-3 top-6"></View>}
        >
          <Text body styleClassName="flex-wrap w-72">
            Check what cocktail recipes you can make with these ingredients
          </Text>
        </Popover>

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
              ListFooterComponent={<View />}
              ListEmptyComponent={
                <View className="flex-1 justify-center w-full">
                  {!!ingredientError && (
                    <View className="p-6">
                      <InfoBox type="error" description={ingredientError?.message} />
                    </View>
                  )}
                  {ingredientLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <View
                      testID="empty-bar"
                      className="w-full flex-1 justify-center items-center mt-8 min-h-[400px]"
                    >
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

          <Tabs.TabPage title="My Recipes" styleClassName="p-0">
            <RecipeGrid
              recipes={allRecipes as any}
              onRefresh={() => totalMatchRefetch()}
              refreshing={totalMatchLoading}
              renderAsList
              ListEmptyComponent={
                !totalMatchLoading && (
                  <>
                    {!!totalMatchError ? (
                      <View className="p-6 w-full">
                        <InfoBox type="error" description={totalMatchError?.message} />
                      </View>
                    ) : (
                      <View className="w-full flex-1 justify-center items-center mt-8">
                        <Text h3 styleClassName="text-center max-w-[280px] mb-3">
                          Add more ingredients to get recipe suggestions.
                        </Text>
                      </View>
                    )}
                  </>
                )
              }
            />
          </Tabs.TabPage>
        </Tabs>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
