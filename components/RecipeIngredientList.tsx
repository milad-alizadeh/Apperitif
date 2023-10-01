import * as React from 'react'
import { View } from 'react-native'
import { GetRecipeDetailsQuery } from '~/__generated__/graphql'
import { ListItem } from './ListItem'

/**
 * Props for the RecipeIngredientList component
 */
export interface RecipeIngredientListProps {
  /** An array of recipe ingredients */
  recipeIngredients: GetRecipeDetailsQuery['recipesCollection']['edges'][number]['node']['recipesIngredientsCollection']['edges'][number]['node'][]
  /** A function that is called when a list item is pressed */
  onPress?: (id: string) => void
}

/**
 * A component that renders a list of recipe ingredients
 *
 */
export const RecipeIngredientList = function RecipeIngredientList({
  recipeIngredients,
  onPress,
}: RecipeIngredientListProps) {
  return (
    <View className="flex">
      {recipeIngredients.map(({ ingredient, quantity, unit }) => (
        <ListItem
          key={ingredient.id}
          name={ingredient.name}
          leftText={`${quantity ?? ''} ${unit?.name}`}
          rightIcon="text"
          onRightIconPress={() => onPress && onPress(ingredient.id)}
        />
      ))}
    </View>
  )
}
