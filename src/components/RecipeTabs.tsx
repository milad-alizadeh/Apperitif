import { useQuery } from '@apollo/client'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { GetRecipeDetailsQuery, Units } from '~/__generated__/graphql'
import { defaultJiggerSize } from '~/constants'
import { GET_UNITS } from '~/graphql/queries'
import { useAnalytics, useSession } from '~/hooks'
import { useDetailsModal, useStore } from '~/providers'
import { convertUnitToOtherSystem } from '~/store'
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
  loading?: boolean
  isPitcher?: boolean
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
  loading,
  isPitcher,
}: RecipeTabsProps) {
  const { selectedJiggerSize, doubleRecipe, selectedUnitSystem } = useStore()
  const { capture } = useAnalytics()
  const { isLoggedIn } = useSession()
  const { data } = useQuery(GET_UNITS)

  const units = data?.unitsCollection?.edges.map((e) => e.node) as Units[]
  const jiggerMultiplier = isPitcher ? 1 : selectedJiggerSize / defaultJiggerSize
  const doubleRecipeMultiplier = doubleRecipe ? 2 : 1
  const multiplier = jiggerMultiplier * doubleRecipeMultiplier

  const missingIngredients = []
  const inStockIngredients = []

  for (const ingredient of ingredients) {
    if (ingredient.inMyBar) {
      inStockIngredients.push(ingredient)
    } else {
      missingIngredients.push(ingredient)
    }
  }

  const renderIngredientItem = useCallback(
    ({ ingredient, quantity, unit, isOptional, inMyBar }: Ingredient & { inMyBar: boolean }) => {
      const { setCurrentIngredientId } = useDetailsModal()
      if (!units) return null
      const { quantity: outputQuantity, unit: outputUnit } = convertUnitToOtherSystem({
        unit: unit as Units,
        toSystem: selectedUnitSystem,
        quantity,
        units,
        multiplier,
      })
      return (
        <ListItem
          key={ingredient.id}
          name={`${ingredient.name}${isOptional ? ' (optional)' : ''}`}
          leftText={`${outputQuantity ? `${outputQuantity} ` : ''}${outputUnit}`}
          showCheckbox={isLoggedIn}
          checked={inMyBar}
          testID="recipe-ingredient"
          testIDTextLeft="recipe-ingredient-quantity"
          testIDTextMiddle="recipe-ingredient-name"
          loading={loading}
          rightIcon="text"
          onPress={() => {
            setCurrentIngredientId(ingredient.id)
            capture('recipe:ingredient_details_press', { ingredient_name: ingredient.name })
          }}
        />
      )
    },
    [ingredients, units, selectedUnitSystem, multiplier],
  )

  const renderEquipmentItem = useCallback(
    ({ name, imageUrl, id }: Equipment) => {
      const { setCurrentEquipmentId } = useDetailsModal()
      return (
        <ListItem
          key={id}
          name={name}
          leftImage={imageUrl}
          rightIcon="text"
          testID="recipe-equipment"
          onPress={() => {
            setCurrentEquipmentId(id)
            capture('recipe:equipment_details_press', { equipment_name: name })
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
    <Tabs initialIndex={0}>
      <Tabs.TabPage title="Ingredients">
        <RecipeMeasurements
          isPitcher={isPitcher}
          styleClassName="pb-6 mb-3 border-b-[1px] border-neutral-200"
        />

        {!!inStockIngredients?.length && (
          <View accessible>
            <View>{inStockIngredients.map((ingredient) => renderIngredientItem(ingredient))}</View>
          </View>
        )}

        {!!missingIngredients?.length && (
          <View>{missingIngredients.map((ingredient) => renderIngredientItem(ingredient))}</View>
        )}
      </Tabs.TabPage>

      <Tabs.TabPage title="Method">
        <View accessible>{steps.map((step) => renderStepItem(step))}</View>
      </Tabs.TabPage>

      <Tabs.TabPage title="Equipment">
        <View accessible>{equipment.map((equipment) => renderEquipmentItem(equipment))}</View>
      </Tabs.TabPage>
    </Tabs>
  )
}

export default RecipeTabs
