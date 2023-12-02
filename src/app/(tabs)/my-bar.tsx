import { useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'
import { Popover, usePopover } from 'react-native-modal-popover'
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
import { GET_LOCAL_STATE } from '~/graphql/queries'
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
  const [deleteingItemId, setDeleteingItemId] = useState<string>('')

  const { data } = useQuery(GET_LOCAL_STATE)
  const updateCache = useUpdateCache()

  const handleIngredientPress = useCallback((ingredientId: string) => {
    setIngredientId(ingredientId)
    modalRef.current.show()
  }, [])

  const {
    openPopover: openFirstPopover,
    closePopover: closeFirstPopover,
    popoverVisible: firstPopoverVisible,
    touchableRef: firstTouchableRef,
    popoverAnchorRect: firstPopoverAnchorRect,
  } = usePopover()
  const {
    openPopover: openSecondPopover,
    closePopover: closeSecondPopover,
    popoverVisible: secondPopoverVisible,
    touchableRef: secondTouchableRef,
    popoverAnchorRect: secondPopoverAnchorRect,
  } = usePopover()

  useEffect(() => {
    if (!data?.myBarPopoverDismissed) {
      openFirstPopover()
    }
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

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={['top']}>
      {/* List of ingredients in the bar */}
      <Header
        title="My Bar"
        rightElement={
          <>
            <Button
              ref={firstTouchableRef}
              testID="add-ingredients-button"
              large={false}
              label="Add Ingredients"
              onPress={() => {
                capture('my_bar:add_ingredients_press')
                router.push('/add-ingredients')
              }}
            />
            <Popover
              visible={firstPopoverVisible}
              onClose={closeFirstPopover}
              fromRect={firstPopoverAnchorRect}
              contentStyle={{ padding: 12, borderRadius: 12 }}
              placement="bottom"
              onDismiss={() => {
                openSecondPopover()
                updateCache(GET_LOCAL_STATE, { myBarPopoverDismissed: true })
                capture('my_bar:popover_dismiss')
              }}
            >
              <Text body styleClassName="flex-wrap">
                Add ingredients to your bar
              </Text>
            </Popover>
          </>
        }
      />
      <View ref={secondTouchableRef} className="flex-1">
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
              recipes={getRecipeMatch(totalMatchData)}
              onRefresh={() => totalMatchRefetch()}
              refreshing={totalMatchLoading}
              ListHeaderComponent={
                !data?.totalMatchInfoBoxDismissed ? (
                  <InfoBox
                    styleClassName="my-3 mx-6"
                    description="Explore cocktail recipes you can make with your current ingredients."
                    onClose={() =>
                      updateCache(GET_LOCAL_STATE, { totalMatchInfoBoxDismissed: true })
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

          <Tabs.TabPage title="Almost can make" styleClassName="p-0">
            <RecipeGrid
              recipes={getRecipeMatch(partialMatchData)}
              onRefresh={() => partialMatchRefetch()}
              refreshing={partialMatchLoading}
              ListHeaderComponent={
                !data?.partialMatchInfoBoxDismissed ? (
                  <InfoBox
                    styleClassName="my-3 mx-6"
                    description="See which cocktails you're close to making with just 1-2 more ingredients."
                    onClose={() =>
                      updateCache(GET_LOCAL_STATE, { partialMatchInfoBoxDismissed: true })
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
      </View>

      <Popover
        visible={secondPopoverVisible}
        onClose={closeSecondPopover}
        fromRect={secondPopoverAnchorRect}
        contentStyle={{ padding: 12, borderRadius: 12 }}
        placement="auto"
      >
        <Text body styleClassName="flex-wrap w-72">
          Check what cocktail recipes you can make with these ingredients
        </Text>
      </Popover>

      {/* Ingredient details Modal */}
      <BottomSheet ref={modalRef}>
        <IngredientDetails
          ingredientId={ingredientId}
          showCta={false}
          onClosed={() => modalRef.current.hide()}
        />
      </BottomSheet>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
