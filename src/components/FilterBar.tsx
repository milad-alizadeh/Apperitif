import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { View } from 'react-native'
import { Badge } from '~/components/Badge'
import { FilterChips } from '~/components/FilterChips'
import { Icon } from '~/components/Icon'
import { SearchBar } from '~/components/SearchBar'
import { useAnalytics } from '~/hooks/useAnalytics'
import { removeFilter, searchQueryVar, selectedFiltersVar, setupDraftFilters } from '~/store'
import { colors, shadowCard } from '~/theme'

export interface FIlterBarProps {
  styleClassName: string
  autofocus?: boolean
}

/**
 * Describe your component here
 */
export function FilterBar({ styleClassName, autofocus }: FIlterBarProps) {
  const { capture } = useAnalytics()
  const selectedFilters = useReactiveVar(selectedFiltersVar)
  const { colorScheme } = useColorScheme()
  const borderColor = colorScheme === 'dark' ? colors.neutral[600] : ''

  return (
    <View className={styleClassName}>
      <View
        className="flex-row bg-white dark:bg-neutral-800 rounded-lg mx-6 my-3"
        style={[{ ...shadowCard }, { borderColor, borderWidth: 1 }]}
      >
        <SearchBar
          testId="search-bar"
          onChange={(value) => searchQueryVar(value)}
          autofocus={autofocus}
        />

        <Icon
          icon="settings"
          size="large"
          testID="filter-icon"
          containerClassName="bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-600 dark:border-l-[1px] rounded-r-lg"
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

      <FilterChips
        styleClassName="px-6"
        categories={selectedFilters}
        testIDItem="filter-chip"
        onDismiss={(filter) => {
          removeFilter(filter, false)
          capture('browse:filter_remove', { filter_name: filter.name })
        }}
      />
    </View>
  )
}
