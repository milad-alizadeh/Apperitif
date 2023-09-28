import { Button } from '~/components'
// import { useStores } from '~/models'
import * as React from 'react'
import { View } from 'react-native'

/**
 * Actions for applying or clearing filters
 */
export const FilterActions = function FilterActions() {
  // const { recipeStore } = useStores()

  return (
    <View className="fle flex-row justify-between items-center px-4 mt-auto py-6">
      {/* <View className="px-2 flex-1">
        <Button
          label="Clear all"
          outline
          enableHaptics
          onPress={() => {
            recipeStore.clearFilters()
            browseNavigation.navigate('FilteredRecipes', { categoryId: '' })
          }}
        />
      </View>
      <View className="px-2 flex-1">
        <Button
          label="Apply Filters"
          enableHaptics
          onPress={() => {
            recipeStore.applyFilters()
            browseNavigation.navigate('FilteredRecipes', { categoryId: '' })
          }}
        />
      </View> */}
    </View>
  )
}
