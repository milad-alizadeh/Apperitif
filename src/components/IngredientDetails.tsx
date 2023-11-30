import { useMutation, useQuery } from '@apollo/client'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ADD_TO_MY_BAR } from '~/graphql/mutations'
import { GET_MY_BAR, GET_RECIPES_BY_INGREDIENT } from '~/graphql/queries'
import { GET_INGREDIENT_DETAILS } from '~/graphql/queries/getIngredientDetails'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useSession } from '~/hooks/useSession'
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
}

/**
 * A component that displays details for a specific ingredient
 */
export const IngredientDetails = function IngredientDetails({
  ingredientId,
  onClosed,
}: IngredientDetailsProps) {
  const { screen, capture } = useAnalytics()
  const { user, isLoggedIn } = useSession()
  const { data, loading } = useQuery(GET_INGREDIENT_DETAILS, {
    variables: { ingredientId },
  })
  const { data: barIngredients, refetch: myBarRefetch } = useQuery(GET_MY_BAR)
  const { data: relatedRecipes } = useQuery(GET_RECIPES_BY_INGREDIENT, {
    variables: { ingredientId },
  })

  const [addToMyBar, { loading: addLoading }] = useMutation(ADD_TO_MY_BAR)
  const myBar = barIngredients.profilesIngredientsCollection.edges.map((e) => e.node.ingredient.id)
  const isInMyBar = myBar.includes(ingredientId)
  const ingredient = data?.ingredientsCollection.edges[0]?.node
  const availableRecipes =
    relatedRecipes?.recipesIngredientsCollection.edges.map((e) => ({
      name: e.node.recipe.name,
      id: e.node.recipe.id,
      imageUrl: e.node.recipe.imageUrl,
      onPress: () => {
        router.push(`/recipe/${e.node.recipe.id}`)
        onClosed && onClosed()
      },
    })) ?? []

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
        console.log(error)
      },
    })
  }

  useEffect(() => {
    screen('ingredient_details', { ingredinet_name: ingredient?.name })
  }, [ingredient])

  return (
    <View className="min-h-[500px] p-6 flex-">
      <View className={`${loading ? 'flex-1 justify-center' : 'justify-start'}`}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View className="flex-1">
            {/* Name */}
            <View className="mb-3 flex-1">
              <Text h2 weight="bold">
                {ingredient?.name}
              </Text>
            </View>

            {/* Description */}
            <View className="flex-1">
              <Markdown text={ingredient?.description} />
            </View>

            {/* Related Recipes */}
            <View className="-mx-6 mt-6 min-h-[200px]">
              <HorizontalList
                listItems={availableRecipes as any}
                title="Recipes"
                showCount={false}
              />
            </View>

            {isLoggedIn && (
              <View>
                {/* Stock information */}
                <View className="flex-row items-center mr-2 rounded-xl mt-6">
                  <Checkbox checked={isInMyBar} disabled styleClassName="mr-3" />
                  <Text body weight="bold">
                    {isInMyBar ? 'In My Bar' : 'You don’t have this ingredient in your bar'}
                  </Text>
                </View>

                {/* Add to my bar */}
                {!isInMyBar && (
                  <Button
                    styleClassName="mt-6"
                    loading={addLoading}
                    large
                    label="Add To My Bar"
                    enableHaptics
                    onPress={() => {
                      capture('ingredient:add_to_bar_press', { ingredient_name: ingredient?.name })
                      handleAddToMyBar(ingredientId)
                    }}
                  />
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  )
}
