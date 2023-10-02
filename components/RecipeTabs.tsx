import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { ListItem } from './ListItem'
import { RecipeMeasurements } from './RecipeMeasurements'
import { Tabs } from './Tabs'
import { Text } from './Text'

export interface RecipeTabsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  ingredients: any
  steps: any
  equipment: any
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
  const [activeIndex, setActiveIndex] = React.useState(0)

  const renderEquipmentItem = useCallback(
    ({ item: { name, imageUrl, id } }) => {
      return (
        <ListItem
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

  const renderIngredientItem = useCallback(
    ({ item: { ingredient, quantity, unit } }) => {
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

  const renderStepItem = useCallback(
    ({ item: { number, description } }) => {
      return <ListItem name={description} leftText={`${number ?? ''}`} />
    },
    [steps],
  )

  return (
    <Tabs initialIndex={0}>
      <Tabs.TabPage title="Ingredients">
        <RecipeMeasurements />
        <FlatList
          data={ingredients}
          renderItem={renderIngredientItem}
          keyExtractor={(item) => item.id}
        />
      </Tabs.TabPage>

      <Tabs.TabPage title="Equipments">
        <FlatList
          data={equipment}
          renderItem={renderEquipmentItem}
          keyExtractor={(item) => item.id}
        />
      </Tabs.TabPage>
      <Tabs.TabPage title="Method">
        <FlatList data={steps} renderItem={renderStepItem} keyExtractor={(item) => item.id} />
      </Tabs.TabPage>
    </Tabs>
  )
}

export default RecipeTabs
