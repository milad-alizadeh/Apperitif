import { router } from 'expo-router'
import React, { useCallback, useRef, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import {
  BottomSheet,
  BottomSheetRef,
  Button,
  Header,
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

export default function MyBarHomeScreen() {
  const { user } = useSession()
  const modalRef = useRef<BottomSheetRef>(null)
  const [ingredientId, setIngredientId] = useState<string>('')

  const handleIngredientPress = useCallback((ingredientId: string) => {
    setIngredientId(ingredientId)
    modalRef.current.show()
  }, [])

  const {
    sectionsData,
    sectionsHeader,
    deleteFromMyBar,
    ingredientRefetch,
    totalMatchRefetch,
    partialMatchRefetch,
    getRecipeMatch,
    totalMatchData,
    totalMatchLoading,
    partialMatchData,
    partialMatchLoading,
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
            contentContainerStyle={{ minHeight: 600 }}
            ListEmptyComponent={
              <View className="flex-1 justify-center ">
                <View className="w-full justify-center items-center mt-8">
                  <Text h3 styleClassName="text-center max-w-[220px] mb-3">
                    Uh-oh, your bar is drier than a Martini!
                  </Text>
                  <Text styleClassName="text-center" body>
                    Add some ingredients to get shaking.
                  </Text>
                </View>
              </View>
            }
          />
        </Tabs.TabPage>

        <Tabs.TabPage title="Available Cocktails" styleClassName="px-6 py-0">
          <RecipeGrid
            recipes={getRecipeMatch(totalMatchData)}
            onRefresh={() => totalMatchRefetch()}
            refreshing={totalMatchLoading}
            ListHeaderComponent={<View className="h-6"></View>}
            ListEmptyComponent={
              <View>
                <Text styleClassName="text-center" body>
                  Add more ingredients to get recipe suggestions.
                </Text>
              </View>
            }
          />
        </Tabs.TabPage>

        <Tabs.TabPage title="Closest Match" styleClassName="px-6 py-0">
          <RecipeGrid
            recipes={getRecipeMatch(partialMatchData)}
            onRefresh={() => partialMatchRefetch()}
            refreshing={partialMatchLoading}
            ListHeaderComponent={<View className="h-6"></View>}
            ListEmptyComponent={
              <View>
                <Text styleClassName="text-center" body>
                  Add more ingredients to get recipe suggestions.
                </Text>
              </View>
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
