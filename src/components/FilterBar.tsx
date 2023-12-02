import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import flattenDeep from 'lodash/flattenDeep'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Badge } from '~/components/Badge'
import { FilterChips } from '~/components/FilterChips'
import { Icon } from '~/components/Icon'
import { SearchBar } from '~/components/SearchBar'
import { Text } from '~/components/Text'
import { useAnalytics } from '~/hooks/useAnalytics'
import { removeFilter, searchQueryVar, selectedFiltersVar, setupDraftFilters } from '~/store'
import { colors, shadowCard } from '~/theme'
import { useFetchFilters } from '../hooks/useFetchFilters'

export interface FIlterBarProps {
  styleClassName: string
  autofocus?: boolean
}

/**
 * Describe your component here
 */
export function FilterBar({ styleClassName, autofocus }: FIlterBarProps) {
  const { capture } = useAnalytics()
  const { data, error, loading } = useFetchFilters()

  const selectedFilters = useReactiveVar(selectedFiltersVar)

  const chips = useMemo(
    () =>
      flattenDeep(
        data?.categoriesCollection.edges.map((edge) => edge.node.categoriesCollection.edges) || [],
      )
        .filter((edge) => selectedFilters.includes(edge.node.id))
        .map((edge) => ({ id: edge.node.id, name: edge.node.name })),
    [data, selectedFilters.slice()],
  )

  return (
    <View className={styleClassName}>
      <View className="flex-row bg-white rounded-lg mx-6" style={{ ...shadowCard }}>
        <Text>{error?.message}</Text>

        <SearchBar
          testId="search-bar"
          onChange={(value) => searchQueryVar(value)}
          autofocus={autofocus}
        />

        <Icon
          icon="settings"
          size="large"
          testID="filter-icon"
          containerClassName="bg-neutral-100 rounded-r-lg"
          color={colors.neutral[500]}
          onPress={() => {
            router.push('/filters')
            setupDraftFilters()
            capture('browse:filters_icon_press')
          }}
        />
        {!!selectedFilters.length && (
          <Badge styleClassName="absolute -right-3 -top-3" label={`${selectedFilters.length}`} />
        )}
      </View>

      {!!chips?.length && !loading && (
        <FilterChips
          styleClassName={`mt-3 -mb-3 pl-6 pr-12 min-h-[32px]`}
          categories={chips}
          testIDItem="filter-chip"
          onDismiss={(id, name) => {
            removeFilter(id, false)
            capture('browse:filter_remove', { filter_name: name })
          }}
        />
      )}
    </View>
  )
}
