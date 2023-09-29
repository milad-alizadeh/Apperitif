import { useQuery } from '@apollo/client'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { FilterActions, Header, ListItem, Screen } from '~/components'
import { GET_FILTER_DETAILS } from '~/graphql/queries/getFilterDetails'

export default function FilterDetailsScreen() {
  const { filterId } = useLocalSearchParams()

  // Fetch available category ids
  const { data } = useQuery(GET_FILTER_DETAILS, {
    variables: { filterId },
  })

  const filterCategory = data?.categoriesCollection.edges[0]?.node
  const items = filterCategory?.categoriesCollection.edges.map((edge) => edge.node)

  const filtersList = items?.map((item) => ({
    ...item,
    checked: false,
    onPress() {
      console.log('onPress')
    },
    // checked: recipeStore.filterIsChecked(item.id),
    // onPress() {
    //   recipeStore.toggleFilter(item.id)
    // },
  }))

  return (
    <Screen preset="scroll" safeAreaEdges={['bottom']} contentContainerStyle={$containerStyle}>
      <Header verticalPadding title={filterCategory?.name} backButton />
      <View className="px-6">
        {filtersList?.map((filter) => {
          return (
            <ListItem
              key={filter.id}
              name={`${filter.name}`}
              styleClassName="mb-4"
              showCheckbox
              checked={filter.checked}
              card
              onPress={filter.onPress}
            />
          )
        })}
      </View>

      <FilterActions />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'space-between',
}
