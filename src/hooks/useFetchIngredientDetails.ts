import { useMutation, useQuery } from '@apollo/client'
import { router, useGlobalSearchParams } from 'expo-router'
import { GetRecipesByIngredientQuery } from '~/__generated__/graphql'
import { ADD_TO_MY_BAR, DELETE_FROM_MY_BAR } from '~/graphql/mutations'
import { GET_INGREDIENT_DETAILS, GET_MY_BAR, GET_RECIPES_BY_INGREDIENT } from '~/graphql/queries'
import { useStore } from '~/providers'
import { captureError } from '~/utils/captureError'
import { useSession } from './useSession'

export const useFetchIngredientDetails = (ingredientId: string, onClosed: () => void) => {
  try {
    const { recipeId } = useGlobalSearchParams()
    const { user } = useSession()
    const { data, loading } = useQuery(GET_INGREDIENT_DETAILS, {
      variables: { ingredientId },
    })
    const { data: barIngredients, refetch: myBarRefetch } = useQuery(GET_MY_BAR)
    const { data: relatedRecipes, loading: recipesLoading } = useQuery(GET_RECIPES_BY_INGREDIENT, {
      variables: { ingredientId },
      fetchPolicy: 'cache-and-network',
    })

    const { setCurrentIngredientId } = useStore()

    const [addToMyBar, { loading: addLoading }] = useMutation(ADD_TO_MY_BAR)
    const [deleteFromMyBar] = useMutation(DELETE_FROM_MY_BAR)
    const myBar =
      barIngredients?.profilesIngredientsCollection.edges.map((e) => e.node?.ingredient?.id) ?? []
    const isInMyBar = myBar.includes(ingredientId)
    const ingredient = data?.ingredientsCollection?.edges[0]?.node

    const getAvailableRecipes = (relatedRecipes: GetRecipesByIngredientQuery) => {
      if (!relatedRecipes) return []

      try {
        return relatedRecipes?.recipesIngredientsCollection?.edges
          .filter((e) => e?.node?.recipe && e?.node?.recipe?.id !== recipeId)
          .map(({ node: { recipe } }) => ({
            name: recipe?.name,
            id: recipe?.id,
            imageUrl: recipe?.imageUrl,
            onPress: () => {
              router.push({
                pathname: '/recipe',
                params: { recipeId: recipe?.id, recipeName: recipe?.name },
              })
              setCurrentIngredientId(null)
              onClosed?.()
            },
          }))
          .slice(0, 10)
      } catch (error) {
        captureError(error)
        return []
      }
    }

    const availableRecipes = getAvailableRecipes(relatedRecipes)

    const handleAddToMyBar = (ingredientId: string) => {
      addToMyBar({
        variables: {
          records: [
            {
              profileId: user?.id,
              ingredientId,
            },
          ],
        },
        onCompleted: () => {
          myBarRefetch()
        },
        onError: (error) => {
          captureError(error)
        },
      })
    }

    const handleDeleteFromMyBar = (ingredientId: string) => {
      deleteFromMyBar({
        variables: {
          profileIds: [user?.id],
          ingredientIds: [ingredientId],
        },
        onCompleted: () => {
          myBarRefetch()
        },
        onError: (error) => {
          captureError(error)
        },
      })
    }

    return {
      ingredient,
      loading: loading && !data,
      recipesLoading: recipesLoading && !relatedRecipes,
      availableRecipes,
      addLoading,
      isInMyBar,
      handleAddToMyBar,
      handleDeleteFromMyBar,
    }
  } catch (error) {
    captureError(error)
  }
}
