import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { Chip } from './Chip'

export interface FilterChipsProps {
  styleClassName?: string
  categories: { id: string; name: string }[]
  onDismiss: (id: string, name: string) => void
  testID?: string
  testIDItem?: string
}

/**
 * Describe your component here
 */
export const FilterChips = function FilterChips({
  categories,
  onDismiss,
  styleClassName,
  testID,
  testIDItem,
}: FilterChipsProps) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className={`flex-row ${styleClassName}`}
      testID={testID}
    >
      {categories.map((category) => {
        return (
          <Chip
            testIDText={testIDItem}
            key={category.id}
            label={`${category.name}`}
            styleClassName="mr-3"
            onDismiss={() => onDismiss(category.id, category.name)}
          />
        )
      })}
      <View className="w-8" />
    </ScrollView>
  )
}
