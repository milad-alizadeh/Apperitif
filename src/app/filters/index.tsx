import { useReactiveVar } from '@apollo/client'
import React, { useCallback } from 'react'
import { View, ViewStyle } from 'react-native'
import { FilterActions, ListItem, Screen, SectionList } from '~/components'
import { useFetchFilters } from '~/hooks/useFetchFilters'
import { draftSelectedFiltersVar, toggleFilter } from '~/store'

export default function AllFiltersScreen() {
  const { sectionsData, sectionsHeaders } = useFetchFilters()
  const draftFilters = useReactiveVar(draftSelectedFiltersVar)

  const renderItem = useCallback(
    ({ item }: { item; index: number }) => {
      return (
        <View className="px-5">
          <ListItem
            key={item.id}
            name={item.name}
            styleClassName="mb-4"
            card
            showCheckbox
            testID="filter-list-item"
            checked={!!draftFilters.find((filter) => filter.id === item.id)}
            onPress={() => {
              toggleFilter(item, true)
            }}
          />
        </View>
      )
    },
    [sectionsData],
  )

  return (
    <Screen preset="fixed" safeAreaEdges={['bottom']} contentContainerStyle={$containerStyle}>
      <SectionList
        sectionsData={sectionsData}
        sectionsHeader={sectionsHeaders}
        renderItem={renderItem}
      />
      <FilterActions />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'space-between',
}
