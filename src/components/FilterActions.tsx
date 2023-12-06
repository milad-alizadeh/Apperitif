import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import * as React from 'react'
import { View } from 'react-native'
import { useAnalytics } from '~/hooks/useAnalytics'
import { applyFilters, clearFilters, draftSelectedFiltersVar, selectedFiltersVar } from '~/store'
import { Button } from './Button'

/**
 * Actions for applying or clearing filters
 */
export const FilterActions = function FilterActions() {
  const { capture } = useAnalytics()
  const selectedFilters = useReactiveVar(selectedFiltersVar)
  const draftSelectedFilters = useReactiveVar(draftSelectedFiltersVar)

  return (
    <View className="fle flex-row justify-between items-center px-4 mt-auto py-6">
      <View className="px-2 flex-1">
        <Button
          label="Clear all"
          outline
          testID="clear-all-filters-button"
          enableHaptics
          onPress={() => {
            // Capture the event that the user removed each filter
            for (const filter of selectedFilters) {
              capture('browse:filter_remove', {
                filter_name: filter,
              })
            }

            clearFilters(false)

            router.push({
              pathname: '/browse/recipes',
              params: { categoryIds: [], categoryName: '' },
            })
          }}
        />
      </View>
      <View className="px-2 flex-1">
        <Button
          label="Apply Filters"
          enableHaptics
          testID="apply-filters-button"
          onPress={() => {
            const itemsAdded = draftSelectedFilters.filter(
              (item) => !selectedFilters.find((filter) => filter.id === item.id),
            )
            const itemsRemoved = selectedFilters.filter(
              (item) => !draftSelectedFilters.find((filter) => filter.id === item.id),
            )

            // Capture the event that the user added each filter
            for (const filter of itemsAdded) {
              capture('browse:filter_add', {
                filter_name: filter.name,
              })
            }

            // Capture the event that the user removed each filter
            for (const filter of itemsRemoved) {
              capture('browse:filter_remove', {
                filter_name: filter.name,
              })
            }

            applyFilters(draftSelectedFilters)
            router.push({
              pathname: '/browse/recipes',
              params: { categoryIds: [], categgoryName: '' },
            })
          }}
        />
      </View>
    </View>
  )
}
