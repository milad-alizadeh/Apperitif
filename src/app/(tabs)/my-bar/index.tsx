import { useMutation, useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { GetCanAlmostMakeRecipesQuery, GetTotalmatchRecipesQuery } from '~/__generated__/graphql'
import {
  BottomSheet,
  BottomSheetRef,
  Button,
  CardProps,
  Header,
  HorizontalList,
  IngredientDetails,
  ListItem,
  Screen,
  SectionDataType,
  SectionHeaderType,
  SectionList,
  Text,
} from '~/components'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { GET_CAN_ALMOST_MAKE_RECIPES, GET_MY_BAR, GET_TOTAL_MATCH_RECIPES } from '~/graphql/queries'
import { useSession } from '~/hooks/useSession'

const HEADER_HEIGHT_NO_RECIPES = 184
const HEADER_HEIGHT_TOTAL_MATCHED = 184
const HEADER_HEIGHT_PARTIAL_MATCH = 184
const HEADER_HEIGHT = 1

export default function MyBarHomeScreen() {
  const { user } = useSession()
  const [ingredientId, setIngredientId] = useState<string>('')
  const modalRef = useRef<BottomSheetRef>(null)

  const { data: ingredientsData, refetch } = useQuery(GET_MY_BAR)
  const { data: totalMatchData } = useQuery(GET_TOTAL_MATCH_RECIPES)
  const { data: partialMatchData } = useQuery(GET_CAN_ALMOST_MAKE_RECIPES)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      // Refetch the data when the tab gains focus
      refetch()
    }
  }, [isFocused, refetch])

  const ingredientsInBar = ingredientsData?.profilesIngredientsCollection.edges.map((e) => ({
    name: e.node.ingredient.name,
    id: e.node.ingredient.id,
    category: e.node.ingredient.ingredientsCategoriesCollection.edges[0].node.category?.name,
  }))

  const getRecipeMatch = (
    matchedData: GetTotalmatchRecipesQuery | GetCanAlmostMakeRecipesQuery,
  ): CardProps[] => {
    return (
      matchedData?.availableRecipesForProfilesCollection?.edges?.map(
        ({ node: { recipeId, recipeImageUrl, recipeName } }) => ({
          id: recipeId,
          imageUrl: recipeImageUrl,
          name: recipeName,
          onPress: () => {
            router.push(`/recipe/${recipeId}`)
          },
        }),
      ) ?? []
    )
  }

  let sectionsData: SectionDataType[][] = []
  let sectionsHeader: SectionHeaderType[] = []

  // Reduces an array of ingredients into an array of categories with their respective ingredients.
  const categoriesdIngredients =
    ingredientsInBar?.reduce((acc, item) => {
      const existingSection = acc.find((section) => section.title === item.category)
      if (existingSection) {
        existingSection.data.push(item)
        existingSection.count += 1
      } else {
        acc.push({
          title: item.category,
          data: [item],
          count: 1,
        })
      }
      return acc
    }, []) ?? []

  sectionsData = categoriesdIngredients.map((section) => section.data)
  sectionsHeader = categoriesdIngredients.map((section) => ({
    title: section.title,
    count: section.count,
    id: section.title,
  }))

  const [deleteFromMyBar] = useMutation(DELETE_FROM_MY_BAR)

  const handleIngredientPress = useCallback((ingredientId: string) => {
    setIngredientId(ingredientId)
    modalRef.current.show()
  }, [])

  const renderItem = useCallback(
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
                refetch()
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

      <SectionList
        sectionsData={sectionsData}
        sectionsHeader={sectionsHeader}
        renderItem={renderItem}
        headerHeight={HEADER_HEIGHT}
        ListFooterComponent={<View />}
        contentContainerStyle={{ flex: !ingredientsInBar ? 1 : undefined }}
        ListEmptyComponent={
          ingredientsInBar && (
            <View className="w-full flex-1 justify-center items-center">
              <Text h3 styleClassName="text-center max-w-[220px] mb-3">
                Uh-oh, your bar is drier than a Martini!
              </Text>
              <Text styleClassName="text-center" body>
                Add some ingredients to get shaking.
              </Text>
            </View>
          )
        }
        ListHeaderComponent={
          <View>
            <Header
              title="My Bar"
              rightElement={
                <Button label="Add Ingredients" onPress={() => router.push('/add-ingredients')} />
              }
            />

            {ingredientsInBar && (
              <HorizontalList
                styleClassName="mt-4"
                title="Recipes I can make"
                listItems={getRecipeMatch(totalMatchData)}
                emptyStateText="Add more ingredients to get recipe suggestions."
              />
            )}

            {getRecipeMatch(partialMatchData)?.length && (
              <HorizontalList
                styleClassName="mt-4"
                title="Recipes I can almost make"
                listItems={getRecipeMatch(partialMatchData)}
                emptyStateText="Add more ingredients to get recipe suggestions."
              />
            )}
          </View>
        }
      />

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
