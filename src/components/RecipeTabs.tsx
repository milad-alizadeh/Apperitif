import { useQuery, useReactiveVar } from '@apollo/client'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { GetRecipeDetailsQuery, Units } from '~/__generated__/graphql'
import { GET_MEASUREMENTS, GET_UNITS } from '~/graphql/queries'
import { UnitSystems, convertUnitToOtherSystem, defaultJiggerSize } from '~/store'
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
  const { data: measurements } = useQuery(GET_MEASUREMENTS)
  const units = data?.unitsCollection?.edges.map((e) => e.node) as Units[]
  const multiplier =
    (measurements?.selectedJiggerSize / defaultJiggerSize) * (measurements?.doubleRecipe ? 2 : 1)

  const renderIngredientItem = useCallback(
    ({ ingredient, quantity, unit, isOptional }: Ingredient) => {
      // if (!units || !measurements) return null
      const { quantity: outputQuantity, unit: outputUnit } = convertUnitToOtherSystem({
        unit: unit as Units,
        toSystem: measurements.selectedUnitSystem as UnitSystems,
        quantity,
        units,
        multiplier,
      })
      return (
        <ListItem
          key={ingredient.id}
          name={`${ingredient.name} ${isOptional ? '(optional)' : ''}`}
          leftText={`${outputQuantity} ${outputUnit}`}
          rightIcon="text"
          onPress={() => onIngredientPress && onIngredientPress(ingredient.id)}
        />
      )
    },
    [ingredients, units, measurements?.selectedUnitSystem, multiplier],
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
        <View key={id} className="mb-4 flex-row">
          <Text weight="bold" styleClassName="mr-2" body>{`${number}.`}</Text>
          <Text body styleClassName="flex-1">
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
        <RecipeMeasurements styleClassName="pb-6 mb-3 border-b-[1px] border-neutral-200" />
        <View>{ingredients.map((ingredient) => renderIngredientItem(ingredient))}</View>
      </Tabs.TabPage>

      <Tabs.TabPage title="Method">
        <View>{steps.map((step) => renderStepItem(step))}</View>
      </Tabs.TabPage>

      <Tabs.TabPage title="Equipment">
        <View>{equipment.map((equipment) => renderEquipmentItem(equipment))}</View>
      </Tabs.TabPage>
    </Tabs>
  )
}

export default RecipeTabs
