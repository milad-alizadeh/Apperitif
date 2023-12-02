import { useReactiveVar } from '@apollo/client'
import { router } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { FlatList, View, ViewStyle } from 'react-native'
import { FilterActions, Header, ListItem, Screen } from '~/components'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useFetchFilters } from '~/hooks/useFetchFilters'
import { draftSelectedFiltersVar } from '~/store'

export default function AllFiltersScreen() {
  const { capture } = useAnalytics()
  const { data } = useFetchFilters()
  const filterCategories = data?.categoriesCollection.edges.map((edge) => edge.node)
  const draftFilters = useReactiveVar(draftSelectedFiltersVar)

  // Memoize the badge numbers for each filter category
  const badgeNumbers = useMemo(() => {
    return filterCategories?.reduce((acc, filterCategory) => {
      const filters = filterCategory.categoriesCollection.edges.map((edge) => edge.node.id)
      const selectedFiltersInCategory = filters.filter((filterId) =>
        draftFilters.includes(filterId),
      )
      acc[filterCategory.id] = selectedFiltersInCategory.length
      return acc
    }, {})
  }, [filterCategories, draftFilters])

  const renderItem = useCallback(
    ({ item }: { item; index: number }) => {
      return (
        <View className="px-6">
          <ListItem
            key={item.id}
            name={item.name}
            styleClassName="mb-4"
            card
            testID="filter-list-item"
            badgeNumber={badgeNumbers[item.id] || 0}
            rightIcon="chevronRight"
            onPress={() => {
              router.push({
                pathname: '/filters/details',
                params: { filterId: item.id, filterName: item.name },
              })

              capture('browse:filter_details_press', {
                filter_name: item.name,
              })
            }}
          />
        </View>
      )
    },
    [filterCategories],
  )

  return (
    <Screen preset="fixed" safeAreaEdges={['bottom']} contentContainerStyle={$containerStyle}>
      <Header
        verticalPadding
        title="Filters"
        onClose={() => {
          capture('browse:filters_modal_close')
          router.back()
        }}
      />
      <FlatList data={filterCategories} renderItem={renderItem} className="py-3" />
      <FilterActions />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'space-between',
}
