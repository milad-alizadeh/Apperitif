import { useNavigation } from '@react-navigation/native'
import { Button } from 'app/components'
import { useStores } from 'app/models'
import { BrowseNavigatorProps } from 'app/navigators'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { View } from 'react-native'

/**
 * Actions for applying or clearing filters
 */
export const FilterActions = observer(function FilterActions() {
  const { recipeStore } = useStores()
  const browseNavigation = useNavigation<BrowseNavigatorProps>()
  return (
    <View className="fle flex-row justify-between items-center px-4 mt-auto py-6">
      <View className="px-2 flex-1">
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
      </View>
    </View>
  )
})
