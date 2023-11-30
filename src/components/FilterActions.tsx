import { useQuery, useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import * as React from 'react'
import { View } from 'react-native'
import { GET_FILTERS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useFetchFilters } from '~/hooks/useFetchFilters'
import { applyFilters, clearFilters, draftSelectedFiltersVar, selectedFiltersVar } from '~/store'
import { Button } from './Button'

/**
 * Actions for applying or clearing filters
 */
export const FilterActions = function FilterActions() {
  const { data: allFilters } = useFetchFilters()
  const { capture } = useAnalytics()
  const selectedFilterIds = useReactiveVar(selectedFiltersVar)
  const draftSelectedFilterIds = useReactiveVar(draftSelectedFiltersVar)

  const subfilters: { id: string; name: string }[] = []

  for (const filter of allFilters?.categoriesCollection.edges) {
    for (const subFilter of filter.node.categoriesCollection.edges) {
      subfilters.push({ id: subFilter.node.id, name: subFilter.node.name })
    }
  }

  const selectedFilters = subfilters.filter((filter) => selectedFilterIds.includes(filter.id))
  const draftSelectedFilters = subfilters.filter((filter) =>
    draftSelectedFilterIds.includes(filter.id),
  )

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
