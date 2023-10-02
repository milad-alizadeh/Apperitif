import { useQuery, useReactiveVar } from '@apollo/client'
import orderBy from 'lodash/orderBy'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { GetRecipeDetailsQuery, Units } from '~/__generated__/graphql'
import { GET_UNITS } from '~/graphql/queries'
import { convertUnitToOtherSystem, selectedUnitSystemVar } from '~/store'
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
  const { data } = useQuery(GET_UNITS)
  const selectedUnitSystem = useReactiveVar(selectedUnitSystemVar)
  const units = data?.unitsCollection?.edges.map((e) => e.node) as Units[]

  console.log('ingredients', ingredients)

  const renderIngredientItem = useCallback(
    ({ ingredient, quantity, unit }: Ingredient) => {
      if (!units || !quantity) return null
      const { quantity: outputQuantity, unit: outputUnit } = convertUnitToOtherSystem(
        unit as Units,
        selectedUnitSystem,
        quantity,
        units,
      )
      return (
        <ListItem
          key={ingredient.id}
          name={ingredient.name}
          leftText={`${outputQuantity} ${outputUnit}`}
          rightIcon="text"
          onPress={() => onIngredientPress && onIngredientPress(ingredient.id)}
        />
      )
    },
    [ingredients, units],
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
        <View key={id} className="mb-2">
          <Text body>
            <Text styleClassName="mr-4" weight="bold">
              {`${number}. `}
            </Text>
            {description}
          </Text>
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
