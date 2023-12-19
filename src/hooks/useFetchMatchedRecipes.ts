import { useMutation, useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { GetPartialMatchRecipesQuery, GetTotalmatchRecipesQuery } from '~/__generated__/graphql'
import { CardProps, SectionDataType, SectionHeaderType } from '~/components'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { GET_MY_BAR, GET_PARTIAL_MATCH_RECIPES, GET_TOTAL_MATCH_RECIPES } from '~/graphql/queries'
import { useAppContent } from '~/providers'
import { captureError } from '~/utils/captureError'

export const useFetchMatchedRecipes = () => {
  try {
    const { my_bar } = useAppContent()
    const {
      data: myBarData,
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

    const categoriesdIngredients =
      myBarData?.myBarCollection?.edges
        ?.filter(({ node }) => !my_bar?.hidden_category_ids.includes(node?.id))
        ?.map(({ node }) => node) ?? []

    sectionsData = categoriesdIngredients.map((section) => JSON.parse(section?.data))
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
  } catch (error) {
    captureError(error)
  }
}
