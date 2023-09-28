import * as React from 'react'
import { ScrollView } from 'react-native'
import { Chip } from '~/components'

export interface FilterChipsProps {
  styleClassName?: string
  categories: { id: string; name: string }[]
  onDismiss: (id: string) => void
}

/**
 * Describe your component here
 */
export const FilterChips = function FilterChips({
  categories,
  onDismiss,
  styleClassName,
}: FilterChipsProps) {
  return (
    categories.length > 0 && (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className={`flex-row px-6 ${styleClassName}`}
      >
        {categories.map((category) => {
          return (
            <Chip
              key={category.id}
              label={`${category.name}`}
              styleClassName="mr-3"
              onDismiss={() => onDismiss(category.id)}
            />
          )
        })}
      </ScrollView>
    )
  )
}
