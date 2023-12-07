import { useReactiveVar } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import { View, ViewStyle } from 'react-native'
import { FilterActions, ListItem, Screen, SectionList } from '~/components'
import { useFetchFilters } from '~/hooks'
import { draftSelectedFiltersVar, toggleFilter } from '~/store'

export default function AllFiltersScreen() {
  const { sectionsData, sectionsHeaders, resultCount, getResultCount } = useFetchFilters()
  const draftSelectedFilters = useReactiveVar(draftSelectedFiltersVar)

  useEffect(() => {
    getResultCount()
  }, [draftSelectedFilters])

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
            checked={!!draftSelectedFilters.find((filter) => filter.id === item.id)}
            onPress={async () => {
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
      <View className="-mt-6 flex-1">
        <SectionList
          sectionsData={sectionsData}
          sectionsHeader={sectionsHeaders}
          renderItem={renderItem}
          showHeaderCount={false}
        />
      </View>

      <FilterActions resultCount={resultCount} />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flexGrow: 1,
}
