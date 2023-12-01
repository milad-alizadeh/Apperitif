import { useQuery } from '@apollo/client'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { GetRecipeDetailsQuery, Units } from '~/__generated__/graphql'
import { GET_MEASUREMENTS, GET_UNITS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useSession } from '~/hooks/useSession'
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
  ingredients: (Ingredient & { inMyBar: boolean })[]
  equipment: Equipment[]
  steps: Step[]
  onIngredientPress: (id: string) => void
  onEquipmentPress?: (id: string) => void
  loading?: boolean
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
  loading,
}: RecipeTabsProps) {
  const { capture } = useAnalytics()
  const { data } = useQuery(GET_UNITS)
  const { data: measurements } = useQuery(GET_MEASUREMENTS)
  const units = data?.unitsCollection?.edges.map((e) => e.node) as Units[]
  const { isLoggedIn } = useSession()
  const multiplier =
    (measurements?.selectedJiggerSize / defaultJiggerSize) * (measurements?.doubleRecipe ? 2 : 1)

  const missingIngredients = ingredients.filter((ingredient) => !ingredient.inMyBar)
  const inStockIngredients = ingredients.filter((ingredient) => ingredient.inMyBar)

  const renderIngredientItem = useCallback(
    ({ ingredient, quantity, unit, isOptional, inMyBar }: Ingredient & { inMyBar: boolean }) => {
      if (!units || !measurements) return null
      const { quantity: outputQuantity, unit: outputUnit } = convertUnitToOtherSystem({
        unit: unit as Units,
        toSystem: measurements?.selectedUnitSystem as UnitSystems,
        quantity,
        units,
        multiplier,
      })
      return (
        <ListItem
          key={ingredient.id}
          name={`${ingredient.name}${isOptional ? ' (optional)' : ''}`}
          leftText={`${outputQuantity} ${outputUnit}`}
          showCheckbox={isLoggedIn}
          checked={inMyBar}
          outline
          testID="recipe-ingredient"
          testIDTextLeft="recipe-ingredient-quantity"
          testIDTextMiddle="recipe-ingredient-name"
          loading={loading}
          onPress={() => {
            onIngredientPress && onIngredientPress(ingredient.id)
            capture('recipe:ingredient_details_press', { ingredient_name: ingredient.name })
          }}
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
          testID="recipe-equipment"
          onPress={() => {
            capture('recipe:equipment_details_press', { equipment_name: name })
            onEquipmentPress && onEquipmentPress(id)
          }}
          styleClassName="mb-2"
        />
      )
    },
    [equipment],
  )

  const renderStepItem = useCallback(
    ({ number, description, id }: Step) => {
      return (
        <View testID="recipe-step" key={id} className="mb-4 flex-row">
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
    <Tabs
      initialIndex={0}
      onTabChange={(title) => {
        capture('recipe:tab_change', { tab_name: title })
      }}
    >
      <Tabs.TabPage title="Ingredients">
        <RecipeMeasurements styleClassName="pb-6 mb-3 border-b-[1px] border-neutral-200" />

        {!!inStockIngredients?.length && (
          <View>
            <View>{inStockIngredients.map((ingredient) => renderIngredientItem(ingredient))}</View>
          </View>
        )}

        {!!missingIngredients?.length && (
          <View>{missingIngredients.map((ingredient) => renderIngredientItem(ingredient))}</View>
        )}
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
