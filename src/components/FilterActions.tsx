import { useQuery, useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import * as React from 'react'
import { View } from 'react-native'
import { GET_FILTERS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { applyFilters, clearFilters, draftSelectedFiltersVar } from '~/store'
import { Button } from './Button'

/**
 * Actions for applying or clearing filters
 */
export const FilterActions = function FilterActions() {
  const { capture } = useAnalytics()
  const selectedFilterIds = useReactiveVar(draftSelectedFiltersVar)
  const {
    data: selectedFiltersData,
    loading,
    error,
  } = useQuery(GET_FILTERS, {
    variables: { ids: selectedFilterIds },
    skip: !selectedFilterIds?.length,
  })

  const selectedFilters = selectedFiltersData?.categoriesCollection.edges.map((e) => e.node.name)

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

            // Capture the event that the user pressed the clear all button
            capture('browse:filters_clear_press', {
              filter_count: selectedFilters.length,
            })

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
            // Capture the event that the user added each filter
            for (const filter of selectedFilters) {
              capture('browse:filter_add', {
                filter_name: filter,
              })
            }

            // Capture the event that the user pressed the apply filters button
            capture('browse:filters_apply_press', {
              filter_count: selectedFilters.length,
            })

            applyFilters()
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
