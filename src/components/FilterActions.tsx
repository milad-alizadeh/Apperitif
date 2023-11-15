import { router } from 'expo-router'
import * as React from 'react'
import { View } from 'react-native'
import { applyFilters, clearFilters } from '~/store'
import { Button } from './Button'

/**
 * Actions for applying or clearing filters
 */
export const FilterActions = function FilterActions() {
  return (
    <View className="fle flex-row justify-between items-center px-4 mt-auto py-6">
      <View className="px-2 flex-1">
        <Button
          label="Clear all"
          outline
          testID="clear-all-filters-button"
          enableHaptics
          onPress={() => {
            clearFilters(false)
            router.push({ pathname: '/browse/recipes', params: { categoryIds: [] } })
          }}
        />
      </View>
      <View className="px-2 flex-1">
        <Button
          label="Apply Filters"
          enableHaptics
          testID="apply-filters-button"
          onPress={() => {
            applyFilters()
            router.push({ pathname: '/browse/recipes', params: { categoryIds: [] } })
          }}
        />
      </View>
    </View>
  )
}
