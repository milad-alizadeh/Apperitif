import { useQuery, useReactiveVar } from '@apollo/client'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { FlatList, View, ViewStyle } from 'react-native'
import { FilterActions, ListItem, Screen } from '~/components'
import { GET_FILTER_DETAILS } from '~/graphql/queries/getFilterDetails'
import { draftSelectedFiltersVar, toggleFilter } from '~/store'

export default function FilterDetailsScreen() {
  const { filterId } = useLocalSearchParams()

  // Fetch available category ids
  const { data } = useQuery(GET_FILTER_DETAILS, {
    variables: { filterId },
  })

  const filterCategory = data?.categoriesCollection.edges[0]?.node
  const items = filterCategory?.categoriesCollection.edges.map((edge) => edge.node)
  const draftFilters = useReactiveVar(draftSelectedFiltersVar)

  const filtersList = useMemo(
    () =>
      items?.map((item) => ({
        ...item,
        checked: draftFilters.includes(item.id),
        onPress() {
          toggleFilter(item.id, true)
        },
      })),
    [items, draftFilters],
  )

  const renderItem = useCallback(
    ({ item }: { item; index: number }) => {
      return (
        <View className="px-5">
          <ListItem
            key={item.id}
            name={`${item.name}`}
            styleClassName="mb-3"
            showCheckbox
            testID="sub-filter-list-item"
            checked={item.checked}
            card
            onPress={item.onPress}
          />
        </View>
      )
    },
    [filtersList],
  )

  return (
    <Screen preset="fixed" safeAreaEdges={['bottom']} contentContainerStyle={$containerStyle}>
      <FlatList className="py-3" data={filtersList} renderItem={renderItem} />
      <FilterActions />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'space-between',
}
