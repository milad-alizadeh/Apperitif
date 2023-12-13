import { useApolloClient, useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { useLocalSearchParams } from 'expo-router'
import { ADD_TO_FAVOURITES, DELETE_FROM_FAVOURITES } from '~/graphql/mutations'
import { GET_MY_BAR, GET_RECIPE_DETAILS } from '~/graphql/queries'
import { useAppContent } from '~/providers'
import { captureError } from '~/utils/captureError'
import { useAnalytics } from './useAnalytics'
import { useSession } from './useSession'

export const useFetchRecipeDetails = () => {
  try {
    const { capture } = useAnalytics()
    const client = useApolloClient()
    const { recipeId, recipeName } = useLocalSearchParams()
    const { recipe_attributes } = useAppContent()
    const { user } = useSession()

    const { data, error, loading, refetch } = useQuery(GET_RECIPE_DETAILS, {
      variables: { recipeId },
      fetchPolicy: 'cache-and-network',
    })

    const { data: barIngredients } = useQuery(GET_MY_BAR)

    const firstTimeLoading = loading && !data && !error

    const recipe = data?.recipesCollection?.edges[0]?.node
    const isFavourite = recipe?.profilesRecipesCollection.edges.length > 0

    const equipment = recipe?.recipesEquipmentCollection?.edges.map((e) => e?.node?.equipment) ?? []
    const recipeIngredients = recipe?.recipesIngredientsCollection?.edges?.map((e) => e?.node) ?? []
    const steps = recipe?.stepsCollection?.edges.map((e) => e.node) ?? []
    const categories =
      recipe?.recipesCategoriesCollection?.edges.map((e) => e?.node?.category) ?? []
    const attributeCategories = recipe_attributes?.category_ids ?? []
    const attributes =
      attributeCategories.map(
        (id: string) => categories.find((c) => c.parentId === id) ?? { id },
      ) ?? []

    const myBar =
      barIngredients?.profilesIngredientsCollection.edges
        .filter((e) => e?.node?.ingredient)
        .map((e) => e?.node?.ingredient?.id) ?? []

    const mergedRecipeIngredients = recipeIngredients
      .filter((recipeIngredient) => recipeIngredient?.ingredient)
      .map((recipeIngredient) => {
        const inMyBar = myBar.includes(recipeIngredient?.ingredient?.id)
        return {
          ...recipeIngredient,
          inMyBar,
        }
      })

    const [addToFavourites] = useMutation(ADD_TO_FAVOURITES, {
      variables: { recipeId: recipe?.id, profileId: user?.id },
      onError: () => {
        refetch()
      },
      onCompleted: () => {
        capture('recipe:favourite_add', { recipe_name: recipeName })
        refetch()
        client.refetchQueries({ include: ['getFavourites'] })
      },
    })

    const [deleteFromFavourites] = useMutation(DELETE_FROM_FAVOURITES, {
      variables: { recipeId: recipe?.id, profileId: user?.id },
      onError: () => {
        refetch()
      },
      onCompleted: () => {
        capture('recipe:favourite_remove', { recipe_name: recipeName })
        refetch()
        client.refetchQueries({ include: ['getFavourites'] })
      },
    })

    return {
      recipe,
      deleteFromFavourites,
      addToFavourites,
      isFavourite,
      error,
      firstTimeLoading,
      steps,
      mergedRecipeIngredients,
      equipment,
      attributes,
    }
  } catch (error) {
    captureError(error)
  }
}
