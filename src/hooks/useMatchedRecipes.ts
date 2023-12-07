import { useMutation, useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import orderBy from 'lodash/orderBy'
import { useEffect } from 'react'
import { GetPartialMatchRecipesQuery, GetTotalmatchRecipesQuery } from '~/__generated__/graphql'
import { CardProps, SectionDataType, SectionHeaderType } from '~/components'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { GET_MY_BAR, GET_PARTIAL_MATCH_RECIPES, GET_TOTAL_MATCH_RECIPES } from '~/graphql/queries'

export const useMatchedRecipes = () => {
  const {
    data: ingredientsData,
    loading: ingredientLoading,
    refetch: ingredientRefetch,
    error: ingredientError,
  } = useQuery(GET_MY_BAR)

  const {
    data: totalMatchData,
    refetch: totalMatchRefetch,
    loading: totalMatchLoading,
    error: totalMatchError,
  } = useQuery(GET_TOTAL_MATCH_RECIPES)

  const {
    data: partialMatchData,
    refetch: partialMatchRefetch,
    loading: partialMatchLoading,
    error: partialMatchError,
  } = useQuery(GET_PARTIAL_MATCH_RECIPES)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      // Refetch the data when the tab gains focus
      ingredientRefetch()
      totalMatchRefetch()
      partialMatchRefetch()
    }
  }, [isFocused, ingredientRefetch, totalMatchRefetch, partialMatchRefetch])

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
  let categoriesdIngredients =
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

  categoriesdIngredients = orderBy(categoriesdIngredients, ['title'], ['asc'])

  sectionsData = categoriesdIngredients.map((section) => section.data)
  sectionsHeader = categoriesdIngredients.map((section) => ({
    title: section.title,
    count: section.count,
    id: section.title,
  }))

  const [deleteFromMyBar] = useMutation(DELETE_FROM_MY_BAR)

  return {
    deleteFromMyBar,
    getRecipeMatch,
    ingredientLoading,
    ingredientRefetch,
    ingredientsInBar,
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
  }
}
