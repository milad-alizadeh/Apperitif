import { useNavigation } from '@react-navigation/native'
import flattenDeep from 'lodash/flattenDeep'
import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { shadowCard } from '~/theme/shadows'
import { Badge, FilterChips, Icon, SearchBar, Text } from '../components'
import { useFetchFilters } from '../hooks/useFetchFilters'
// import { useStores } from '../models'
import { colors } from '../theme'

export interface FilterProps {
  styleClassName: string
  autofocus?: boolean
}

/**
 * Describe your component here
 */
export const Filter = function Filter({ styleClassName, autofocus }: FilterProps) {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { data, error } = useFetchFilters()

  // const selectedFilters = useMemo(
  //   () =>
  //     flattenDeep(
  //       data?.categoriesCollection.edges.map((edge) => edge.node.categoriesCollection.edges) || [],
  //     )
  //       .filter((edge) => recipeStore.selectedFilters.includes(edge.node.id))
  //       .map((edge) => ({ id: edge.node.id, name: edge.node.name })),
  //   [data, recipeStore.selectedFilters.slice()],
  // )

  return (
    <View className={styleClassName}>
      {/* <View className="flex-row bg-white rounded-lg mx-6" style={{ ...shadowCard }}>
        <Text>{error?.message}</Text>

        <SearchBar
          onChange={(value) => {
            recipeStore.setProp('searchQuery', value)
            setSearchQuery(value)
          }}
          autofocus={autofocus}
        />
        <Icon
          icon="settings"
          size="large"
          containerClassName="bg-neutral-100 rounded-r-lg"
          color={colors.neutral[500]}
          onPress={() => {
            recipeStore.setupDraftFilters()
            navigation.navigate('Filters')
          }}
        />
        {!!recipeStore.selectedFilters.length && (
          <Badge
            styleClassName="absolute -right-3 -top-3"
            label={`${recipeStore.selectedFilters.length}`}
          />
        )}
      </View>

      <FilterChips
        styleClassName="mt-3"
        categories={selectedFilters}
        onDismiss={(id) => recipeStore.removeFilter(id)}
      /> */}
    </View>
  )
}
