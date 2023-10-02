import orderBy from 'lodash/orderBy'
import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { GetRecipeDetailsQuery } from '~/__generated__/graphql'
import { ListItem } from './ListItem'
import { RecipeMeasurements } from './RecipeMeasurements'
import { Tabs } from './Tabs'
import { Text } from './Text'

type Ingredient =
  GetRecipeDetailsQuery['recipesCollection']['edges'][0]['node']['recipesIngredientsCollection']['edges'][0]['node']
type Equipment =
  GetRecipeDetailsQuery['recipesCollection']['edges'][0]['node']['recipesEquipmentCollection']['edges'][0]['node']['equipment']
type Step =
  GetRecipeDetailsQuery['recipesCollection']['edges'][0]['node']['stepsCollection']['edges'][0]['node']

export interface RecipeTabsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  ingredients: Ingredient[]
  equipment: Equipment[]
  steps: Step[]
  onIngredientPress: (id: string) => void
  onEquipmentPress?: (id: string) => void
}

/**
 * Renders a tabbed view for displaying recipe ingredients, equipments and method.
 * @param {Object} props - The component props.
 * @param {Array} props.recipeSteps - The array of recipe steps.
 * @param {Array} props.recipeIngredients - The array of recipe ingredients.
 * @param {Function} props.onIngredientPress - The function to be called when an ingredient is pressed.
 * @returns {JSX.Element} - The JSX element for the RecipeTabs component.
 */
export const RecipeTabs = function RecipeTabs({
  steps,
  ingredients,
  equipment,
  onIngredientPress,
  onEquipmentPress,
}: RecipeTabsProps) {
  const renderIngredientItem = useCallback(
    ({ ingredient, quantity, unit }: Ingredient) => {
      return (
        <ListItem
          key={ingredient.id}
          name={ingredient.name}
          leftText={`${quantity ?? ''} ${unit?.name}`}
          rightIcon="text"
          onPress={() => onIngredientPress && onIngredientPress(ingredient.id)}
        />
      )
    },
    [ingredients],
  )

  const renderEquipmentItem = useCallback(
    ({ name, imageUrl, id }: Equipment) => {
      return (
        <ListItem
          key={id}
          name={name}
          leftImage={imageUrl}
          rightIcon="text"
          onPress={() => onEquipmentPress && onEquipmentPress(id)}
          styleClassName="mb-2"
        />
      )
    },
    [equipment],
  )

  const renderStepItem = useCallback(
    ({ number, description, id }: Step) => {
      return (
        <View key={id} className="flex-row mb-2 items-start">
          <Text styleClassName="mr-2">{number}.</Text>
          <Text>{description}</Text>
        </View>
      )
    },
    [steps],
  )

  return (
    <Tabs initialIndex={0}>
      <Tabs.TabPage title="Ingredients">
        <RecipeMeasurements />
        <View>{ingredients.map((ingredient) => renderIngredientItem(ingredient))}</View>
      </Tabs.TabPage>

      <Tabs.TabPage title="Equipments">
        <View>{equipment.map((equipment) => renderEquipmentItem(equipment))}</View>
      </Tabs.TabPage>

      <Tabs.TabPage title="Method">
        <View>{orderBy(steps, 'number').map((step) => renderStepItem(step))}</View>
      </Tabs.TabPage>
    </Tabs>
  )
}

export default RecipeTabs
