import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import flattenDeep from 'lodash/flattenDeep'
import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { removeFilter, searchQueryVar, selectedFiltersVar, setupDraftFilters } from '~/localState'
import { shadowCard } from '~/theme/shadows'
import { Badge, FilterChips, Icon, SearchBar, Text } from '.'
import { useFetchFilters } from '../hooks/useFetchFilters'
import { colors } from '../theme'

export interface FIlterBarProps {
  styleClassName: string
  autofocus?: boolean
}

/**
 * Describe your component here
 */
export function FilterBar({ styleClassName, autofocus }: FIlterBarProps) {
  const { data, error } = useFetchFilters()

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

        <SearchBar onChange={(value) => searchQueryVar(value)} autofocus={autofocus} />

        <Icon
          icon="settings"
          size="large"
          containerClassName="bg-neutral-100 rounded-r-lg"
          color={colors.neutral[500]}
          onPress={() => {
            router.push('/browse/filters')
            setupDraftFilters()
          }}
        />
        {!!selectedFilters.length && (
          <Badge styleClassName="absolute -right-3 -top-3" label={`${selectedFilters.length}`} />
        )}
      </View>

      <FilterChips styleClassName="mt-3" categories={chips} onDismiss={(id) => removeFilter(id)} />
    </View>
  )
}
