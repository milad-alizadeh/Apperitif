import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { ADD_TO_MY_BAR } from '~/graphql/mutations'
import { GET_MY_BAR } from '~/graphql/queries'
import { GET_INGREDIENT_DETAILS } from '~/graphql/queries/getIngredientDetails'
import { useSession } from '~/hooks/useSession'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { Markdown } from './Markdown'
import { Text } from './Text'

/**
 * Props for the IngredientDetails component
 */
export interface IngredientDetailsProps {
  /** The ID of the ingredient to display details for */
  ingredientId: string
}

/**
 * A component that displays details for a specific ingredient
 */
export const IngredientDetails = function IngredientDetails({
  ingredientId,
}: IngredientDetailsProps) {
  const { user } = useSession()
  const { data, loading } = useQuery(GET_INGREDIENT_DETAILS, {
    variables: { ingredientId },
  })
  const { data: barIngredients, refetch: myBarRefetch } = useQuery(GET_MY_BAR)
  const myBar = barIngredients.profilesIngredientsCollection.edges.map((e) => e.node.ingredient.id)
  const isInMyBar = myBar.includes(ingredientId)
  const ingredient = data?.ingredientsCollection.edges[0]?.node
  const [addToMyBar, { loading: addLoading, error: addError }] = useMutation(ADD_TO_MY_BAR)

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
    })
  }

  return (
    <ScrollView className="min-h-[200px] p-6 pt-6 flex-">
      <View className="justify-end flex-1">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View className="flex-1">
            <View className="mb-3 flex-1">
              <Text h2 weight="bold">
                {ingredient?.name}
              </Text>
            </View>

            <View className="flex-1">
              <Markdown text={ingredient?.description} />
            </View>

            <View className="flex-row items-center mr-2 rounded-xl mt-3">
              <Checkbox checked={isInMyBar} disabled styleClassName="mr-3" />
              <Text body weight="bold">
                {isInMyBar ? 'In My Bar' : 'You don’t have this in your bar'}
              </Text>
            </View>
            {!isInMyBar && (
              <Button
                styleClassName="mt-6"
                loading={addLoading}
                large
                label="Add To My Bar"
                onPress={() => handleAddToMyBar(ingredientId)}
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  )
}
