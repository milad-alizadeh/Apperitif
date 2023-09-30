import * as React from 'react'
import { View } from 'react-native'
import { RecipeIngredientList } from './RecipeIngredientList'
import { RecipeMeasurements } from './RecipeMeasurements'
import { RecipeSteps } from './RecipeSteps'
import { Tabs } from './Tabs'
import { Text } from './Text'

// import TabController from 'react-native-ui-lib/tabController'

export interface RecipeTabsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  recipeIngredients: any
  recipeSteps: any
  onIngredientPress: (id: string) => void
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
  recipeSteps,
  recipeIngredients,
  onIngredientPress,
}: RecipeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <Tabs
      pages={[
        {
          title: 'Ingredients',
          initialIndex: true,
          TabContent: () => (
            <View className="p-5">
              <RecipeMeasurements />
              <RecipeIngredientList
                recipeIngredients={recipeIngredients}
                onPress={(id) => onIngredientPress(id)}
              />
            </View>
          ),
        },
        {
          title: 'Equipments',

          TabContent: () => (
            <View className="p-5">
              <Text>Page 2</Text>
            </View>
          ),
        },
        {
          title: 'Method',
          TabContent: () => (
            <View className="p-5">
              <RecipeSteps steps={recipeSteps} />
            </View>
          ),
        },
      ]}
    />
  )
}

export default RecipeTabs
