import { useQuery } from '@apollo/client'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { FlatList, View, ViewStyle } from 'react-native'
import { FilterActions, Header, ListItem, Screen } from '~/components'
import { GET_FILTER_DETAILS } from '~/graphql/queries/getFilterDetails'
import { filterIsChecked, toggleFilter } from '~/localState'

export default function FilterDetailsScreen() {
  const { filterId } = useLocalSearchParams()

  // Fetch available category ids
  const { data } = useQuery(GET_FILTER_DETAILS, {
    variables: { filterId },
  })

  const filterCategory = data?.categoriesCollection.edges[0]?.node
  const items = filterCategory?.categoriesCollection.edges.map((edge) => edge.node)

  const filtersList = useMemo(
    () =>
      items?.map((item) => ({
        ...item,
        checked: filterIsChecked(item.id, true),
        onPress() {
          toggleFilter(item.id, true)
        },
      })),
    [items, filterIsChecked, toggleFilter],
  )

  const renderItem = useCallback(
    ({ item }: { item; index: number }) => {
      return (
        <ListItem
          key={item.id}
          name={`${item.name}`}
          styleClassName="mb-4"
          showCheckbox
          checked={item.checked}
          card
          onPress={item.onPress}
        />
      )
    },
    [filtersList],
  )

  return (
    <Screen preset="fixed" safeAreaEdges={['bottom']} contentContainerStyle={$containerStyle}>
      <Header verticalPadding title={filterCategory?.name} backButton />

      <FlatList className="px-6" data={filtersList} renderItem={renderItem} />
      <FilterActions />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'space-between',
}
