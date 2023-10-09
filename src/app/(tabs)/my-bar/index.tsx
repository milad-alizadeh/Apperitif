import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import React, { useCallback, useRef, useState } from 'react'
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
import { useMatchedRecipes } from '~/hooks/useMatchedRecipes'
import { useSession } from '~/hooks/useSession'
import { partialMatchInfoBoxDismissedVar, totalMatchInfoBoxDismissedVar } from '~/store'

export default function MyBarHomeScreen() {
  const { user } = useSession()
  const modalRef = useRef<BottomSheetRef>(null)
  const [ingredientId, setIngredientId] = useState<string>('')

  const partialMatchInfoBoxDismissed = useReactiveVar(partialMatchInfoBoxDismissedVar)
  const totalMatchInfoBoxDismissed = useReactiveVar(totalMatchInfoBoxDismissedVar)

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
          onPress={() => handleIngredientPress(item.id)}
          onRightIconPress={() => {
            deleteFromMyBar({
              variables: { ingredientIds: [item.id], profileIds: [user?.id] },
              onCompleted: () => {
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
        styleClassName="mb-auto"
        rightElement={
          <Button label="Add Ingredients" onPress={() => router.push('/add-ingredients')} />
        }
      />

      <Tabs styleClassName="flex-1">
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
                  <View className="w-full justify-center items-center mt-8">
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

        <Tabs.TabPage title="From My Bar" styleClassName="px-6 py-0">
          <RecipeGrid
            recipes={getRecipeMatch(totalMatchData)}
            onRefresh={() => totalMatchRefetch()}
            refreshing={totalMatchLoading}
            ListHeaderComponent={
              !totalMatchInfoBoxDismissed ? (
                <InfoBox
                  styleClassName="m-3"
                  description="These cocktails use only ingredients in your bar."
                  onClose={() => totalMatchInfoBoxDismissedVar(true)}
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

        <Tabs.TabPage title="Closest Match" styleClassName="px-6 py-0">
          <RecipeGrid
            recipes={getRecipeMatch(partialMatchData)}
            onRefresh={() => partialMatchRefetch()}
            refreshing={partialMatchLoading}
            ListHeaderComponent={
              !partialMatchInfoBoxDismissed ? (
                <InfoBox
                  styleClassName="m-3"
                  description="These cocktails use ingredients in your bar and one or more ingredients you don't have."
                  onClose={() => partialMatchInfoBoxDismissedVar(true)}
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
