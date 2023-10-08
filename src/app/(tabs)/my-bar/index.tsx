import { useMutation, useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { GetPartialMatchRecipesQuery, GetTotalmatchRecipesQuery } from '~/__generated__/graphql'
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
import { GET_MY_BAR, GET_PARTIAL_MATCH_RECIPES, GET_TOTAL_MATCH_RECIPES } from '~/graphql/queries'
import { useSession } from '~/hooks/useSession'

export default function MyBarHomeScreen() {
  const { user } = useSession()
  const [ingredientId, setIngredientId] = useState<string>('')
  const modalRef = useRef<BottomSheetRef>(null)

  const { data: ingredientsData, refetch } = useQuery(GET_MY_BAR)
  const { data: totalMatchData, refetch: totalMatchRefetch } = useQuery(GET_TOTAL_MATCH_RECIPES)
  const { data: partialMatchData, refetch: partialMatchRefetch } =
    useQuery(GET_PARTIAL_MATCH_RECIPES)

  const isFocused = useIsFocused()

  const getHeaderHeight = () => {
    const headerHeightNoRecipe = 184
    const horizontalListHeight = 290
    const partialMatchDataLength = getRecipeMatch(partialMatchData)?.length
    const totalMatchDataLength = getRecipeMatch(totalMatchData)?.length

    if (!ingredientsInBar) return headerHeightNoRecipe

    let headerHeight = 0
    if (totalMatchDataLength) headerHeight += horizontalListHeight
    if (partialMatchDataLength) headerHeight += horizontalListHeight

    return headerHeight
  }

  useEffect(() => {
    if (isFocused) {
      // Refetch the data when the tab gains focus
      refetch()
      totalMatchRefetch()
      partialMatchRefetch()
    }
  }, [isFocused, refetch])

  const ingredientsInBar = ingredientsData?.profilesIngredientsCollection.edges.map((e) => ({
    name: e.node.ingredient.name,
    id: e.node.ingredient.id,
    category: e.node.ingredient.ingredientsCategoriesCollection.edges[0].node.category?.name,
  }))

  const getRecipeMatch = (
    matchedData: GetTotalmatchRecipesQuery | GetPartialMatchRecipesQuery,
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

      <SectionList
        sectionsData={sectionsData}
        sectionsHeader={sectionsHeader}
        renderItem={renderItem}
        headerHeight={getHeaderHeight()}
        ListFooterComponent={<View />}
        contentContainerStyle={{ flex: !ingredientsInBar?.length ? 1 : undefined }}
        ListEmptyComponent={
          ingredientsInBar && (
            <View className="flex-1 justify-center ">
              <Header
                title="My Bar"
                styleClassName="mb-auto"
                rightElement={
                  <Button label="Add Ingredients" onPress={() => router.push('/add-ingredients')} />
                }
              />
              <View className="w-full m-auto justify-center items-center">
                <Text h3 styleClassName="text-center max-w-[220px] mb-3">
                  Uh-oh, your bar is drier than a Martini!
                </Text>
                <Text styleClassName="text-center" body>
                  Add some ingredients to get shaking.
                </Text>
              </View>
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

            <HorizontalList
              styleClassName="mt-4"
              title="Recipes I can make"
              listItems={getRecipeMatch(totalMatchData)}
              emptyStateText={
                getRecipeMatch(totalMatchData)?.length &&
                getRecipeMatch(totalMatchData)?.length &&
                ingredientsInBar
                  ? 'Add more ingredients to get recipe suggestions.'
                  : ''
              }
            />

            <HorizontalList
              styleClassName="mt-4"
              title="Recipes I can almost make"
              listItems={getRecipeMatch(partialMatchData)}
            />
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
