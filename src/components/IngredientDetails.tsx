import { useMutation, useQuery } from '@apollo/client'
import { router, useGlobalSearchParams } from 'expo-router'
import { usePathname } from 'expo-router'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ADD_TO_MY_BAR, DELETE_FROM_MY_BAR } from '~/graphql/mutations'
import { GET_MY_BAR, GET_RECIPES_BY_INGREDIENT } from '~/graphql/queries'
import { GET_INGREDIENT_DETAILS } from '~/graphql/queries/getIngredientDetails'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useSession } from '~/hooks/useSession'
import { useStore } from '~/providers'
import { captureError } from '~/utils/captureError'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { HorizontalList } from './HorizontalList'
import { Markdown } from './Markdown'
import { Text } from './Text'

/**
 * Props for the IngredientDetails component
 */
export interface IngredientDetailsProps {
  /** The ID of the ingredient to display details for */
  ingredientId: string
  onClosed?: () => void
  showCta?: boolean
}

/**
 * A component that displays details for a specific ingredient
 */
export const IngredientDetails = function IngredientDetails({
  ingredientId,
  showCta = true,
  onClosed,
}: IngredientDetailsProps) {
  const pathname = usePathname()
  const { recipeId } = useGlobalSearchParams()
  const { screen, capture } = useAnalytics()
  const { user, isLoggedIn } = useSession()
  const { data, loading } = useQuery(GET_INGREDIENT_DETAILS, {
    variables: { ingredientId },
  })
  const { data: barIngredients, refetch: myBarRefetch } = useQuery(GET_MY_BAR)
  const { data: relatedRecipes, loading: recipesLoading } = useQuery(GET_RECIPES_BY_INGREDIENT, {
    variables: { ingredientId },
  })

  const { setCurrentIngredientId } = useStore()

  const [addToMyBar, { loading: addLoading }] = useMutation(ADD_TO_MY_BAR)
  const [deleteFromMyBar] = useMutation(DELETE_FROM_MY_BAR)

  const myBar = barIngredients.profilesIngredientsCollection.edges.map((e) => e.node.ingredient.id)
  const isInMyBar = myBar.includes(ingredientId)
  const ingredient = data?.ingredientsCollection.edges[0]?.node

  const availableRecipes =
    relatedRecipes?.recipesIngredientsCollection.edges
      .filter((e) => e.node.recipe && e.node.recipe.id !== recipeId)
      .map(({ node: { recipe } }) => ({
        name: recipe.name,
        id: recipe.id,
        imageUrl: recipe.imageUrl,
        onPress: () => {
          router.push({
            pathname: '/recipe',
            params: { recipeId: recipe.id, recipeName: recipe.name },
          })
          setCurrentIngredientId(null)
          onClosed && onClosed()
        },
      }))
      .slice(0, 10) ?? []

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

  useEffect(() => {
    if (!ingredient) return
    screen('/ingredient', { ingredient_name: ingredient?.name })
  }, [ingredient])

  return (
    <>
      {loading || recipesLoading ? null : (
        <View className="justify-start flex-1 p-6">
          {/* Name */}
          <View className="mb-3">
            {ingredient?.name && (
              <Text h2 weight="bold" testID="ingredient-name">
                {ingredient?.name}
              </Text>
            )}
          </View>

          {/* Description */}
          <View className="mb-3">
            <Markdown
              testID="ingredient-description"
              externalLinkEventLabel="ingredient:external_link_press"
              text={ingredient?.description}
            />
          </View>

          {/* Related Recipes */}
          {!!availableRecipes.length && (
            <View className="-mx-6 min-h-[200px]">
              <HorizontalList
                listItems={availableRecipes as any}
                title="Used in"
                showCount={false}
              />
            </View>
          )}

          {isLoggedIn && showCta && (
            <View className="mt-auto">
              {/* Stock information */}
              <View className="flex-row items-center mr-2 rounded-xl mt-6">
                <Checkbox checked={isInMyBar} disabled styleClassName="mr-3" />
                <Text body weight="bold">
                  {isInMyBar ? 'In My Bar' : 'You don’t have this ingredient in your bar'}
                </Text>
              </View>

              <Button
                styleClassName="mt-6"
                loading={addLoading}
                large
                label={isInMyBar ? 'Remove from my bar' : 'Add to my bar'}
                enableHaptics
                onPress={() => {
                  if (isInMyBar) {
                    capture('ingredient:ingredient_remove', {
                      ingredient_name: ingredient?.name,
                    })
                    handleDeleteFromMyBar(ingredientId)
                  } else {
                    capture('ingredient:ingredient_add', {
                      ingredient_name: ingredient?.name,
                    })
                    handleAddToMyBar(ingredientId)
                  }
                }}
              />
            </View>
          )}
        </View>
      )}
    </>
  )
}
