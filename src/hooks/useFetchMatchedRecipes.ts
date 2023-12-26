import { useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { GetPartialMatchRecipesQuery, GetTotalmatchRecipesQuery } from '~/__generated__/graphql'
import { CardProps } from '~/components'
import { GET_PARTIAL_MATCH_RECIPES, GET_TOTAL_MATCH_RECIPES } from '~/graphql/queries'
import { captureError } from '~/utils/captureError'

export const useFetchMatchedRecipes = () => {
  try {
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
        totalMatchRefetch()
        partialMatchRefetch()
      }
    }, [isFocused, totalMatchRefetch, partialMatchRefetch])

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

    return {
      getRecipeMatch,
      partialMatchData,
      partialMatchError,
      partialMatchLoading,
      partialMatchRefetch,
      totalMatchData,
      totalMatchError,
      totalMatchLoading,
      totalMatchRefetch,
    }
  } catch (error) {
    captureError(error)
  }
}
