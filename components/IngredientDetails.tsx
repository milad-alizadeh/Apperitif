import { useQuery } from '@apollo/client'
import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { GET_INGREDIENT_DETAILS } from '~/graphql/queries/getIngredientDetails'
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
  const { data, loading } = useQuery(GET_INGREDIENT_DETAILS, {
    variables: { ingredientId },
  })

  const ingredient = data?.ingredientsCollection.edges[0]?.node

  return (
    <ScrollView className="min-h-[200px] p-6 pt-6 flex-">
      <View className="justify-end flex-1">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View className="flex-1">
            <Text h2 weight="bold" styleClassName="mb-2">
              {ingredient?.name}
            </Text>

            <Markdown text={ingredient?.description} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}
