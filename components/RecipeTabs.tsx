import { RecipeIngredientList, RecipeMeasurements, RecipeSteps, Text } from '~/components'
import { colors } from '~/theme'
import * as React from 'react'
import { TextStyle, View, ViewStyle, useWindowDimensions } from 'react-native'
import TabController from 'react-native-ui-lib/tabController'

export interface RecipeTabsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  recipeIngredients: any
  recipeSteps: any
  onIngredientPress: (id: string) => void
}

/**
 * Describe your component here
 */
export const RecipeTabs = function RecipeTabs({
  recipeSteps,
  recipeIngredients,
  onIngredientPress,
}: RecipeTabsProps) {
  const tabWidth = useWindowDimensions().width - 48

  return (
    <TabController
      items={[{ label: 'Ingredients' }, { label: 'Equipments' }, { label: 'Method' }]}
      asCarousel
      carouselPageWidth={tabWidth}
    >
      <TabController.TabBar
        backgroundColor={colors.neutral[100]}
        height={40}
        indicatorStyle={{ backgroundColor: colors.primary }}
        labelColor={colors.neutral[500]}
        labelStyle={$labelStyle}
        selectedLabelStyle={$labelStyle}
        selectedLabelColor={colors.primary}
        containerWidth={tabWidth}
        containerStyle={$tabBarStyle}
      />

      <TabController.PageCarousel>
        <View style={{ width: tabWidth }}>
          <TabController.TabPage index={0}>
            <View className="p-5" style={{ width: tabWidth }}>
              <RecipeMeasurements />
              <RecipeIngredientList
                recipeIngredients={recipeIngredients}
                onPress={(id) => onIngredientPress(id)}
              />
            </View>
          </TabController.TabPage>
        </View>

        <View style={{ width: tabWidth }}>
          <TabController.TabPage index={1}>
            <View className="p-5" style={{ width: tabWidth }}>
              <Text>Page 2</Text>
            </View>
          </TabController.TabPage>
        </View>

        <View style={{ width: tabWidth }}>
          <TabController.TabPage index={2}>
            <View className="p-5" style={{ width: tabWidth }}>
              <RecipeSteps steps={recipeSteps} />
            </View>
          </TabController.TabPage>
        </View>
      </TabController.PageCarousel>
    </TabController>
  )
}

const $tabBarStyle: ViewStyle = {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  overflow: 'hidden',
}

const $labelStyle: TextStyle = {
  fontWeight: '600',
  fontSize: 16,
}
export default RecipeTabs
