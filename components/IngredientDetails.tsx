import { useQuery } from '@apollo/client'
import { Text } from '~/components'
import { GET_INGREDIENT_DETAILS } from '~/graphql/queries/getIngredientDetails'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ScrollView, View } from 'react-native'

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
export const IngredientDetails = observer(function IngredientDetails({
  ingredientId,
}: IngredientDetailsProps) {
  const { data } = useQuery(GET_INGREDIENT_DETAILS, {
    variables: { ingredientId },
  })

  const ingredient = data?.ingredientsCollection.edges[0]?.node

  return (
    <ScrollView className="min-h-[200px] p-6 pt-6 flex-">
      <View className="justify-end flex-1">
        <View className="flex-1">
          <Text h2 weight="bold" styleClassName="mb-2">
            {ingredient?.name}
          </Text>

          <Text body styleClassName="mb-1">
            {ingredient?.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
})
