import { router } from 'expo-router'
import React, { FC, useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { FilterActions, Header, ListItem, Screen } from '~/components'
import { useFetchFilters } from '~/hooks/useFetchFilters'

export default function AllFiltersScreen({ navigation }) {
  const { data } = useFetchFilters()
  const filterCategories = data?.categoriesCollection.edges.map((edge) => edge.node)

  // // Memoize the badge numbers for each filter category
  // const badgeNumbers = useMemo(() => {
  //   return filterCategories?.reduce((acc, filterCategory) => {
  //     const filters = filterCategory.categoriesCollection.edges.map((edge) => edge.node.id)
  //     const selectedFiltersInCategory = filters.filter((filterId) =>
  //       recipeStore.draftSelectedFilters.includes(filterId),
  //     )
  //     acc[filterCategory.id] = selectedFiltersInCategory.length
  //     return acc
  //   }, {})
  // }, [filterCategories, recipeStore.draftSelectedFilters])

  // // Use the memoized badge numbers
  // const getBadgeNumber = (filterCategory) => {
  //   return badgeNumbers[filterCategory.id] || 0
  // }

  return (
    <Screen preset="scroll" safeAreaEdges={['bottom']} contentContainerStyle={$containerStyle}>
      <Header verticalPadding title="Filters" onClose={() => router.back()} />
      <View className="px-6">
        {filterCategories?.map((filterCategory) => (
          <ListItem
            key={filterCategory.id}
            name={filterCategory.name}
            styleClassName="mb-4"
            card
            // badgeNumber={getBadgeNumber(filterCategory)}
            rightIcon="chevronRight"
            onPress={() => navigation.navigate('FilterDetails', { filterId: filterCategory.id })}
          />
        ))}
      </View>
      <FilterActions />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'space-between',
}
