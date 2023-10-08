import * as React from 'react'
import { FlatList, View } from 'react-native'
import { colors } from '~/theme'
import { Card, CardProps } from './Card'
import { Icon } from './Icon'
import { Text } from './Text'

export interface HorizontalListProps {
  /** An array of objects representing the list items to be displayed */
  listItems: CardProps[]
  /** The title of the list */
  title: string
  /** An optional class name to apply to the root View component */
  styleClassName?: string
  /** Whether to use a smaller version of the Card component */
  wide?: boolean
  /** An optional text to display when the list is empty */
  emptyStateText?: string
  /** Whether to show the count of items in the list */
  showCount?: boolean
  /** Whether to center the text */
  center?: boolean
}

/**
 * A horizontal list component that displays a list of cards in a horizontal scroll view.
 */
export const HorizontalList = function HorizontalList({
  listItems,
  title,
  styleClassName,
  wide,
  emptyStateText,
  showCount = true,
  center,
}: HorizontalListProps) {
  /**
   * Renders a single item in the list.
   * @param item The CardProps object to render.
   * @param index The index of the item in the list.
   * @returns A Card component with the specified props.
   */
  const renderItem = ({ item, index }: { item: CardProps; index: number }) => {
    return (
      <Card
        {...item}
        center={center}
        styleClassName={`mr-4 ${index === 0 ? 'ml-6' : ''}`}
        wide={wide}
      />
    )
  }

  return (
    <View className={styleClassName}>
      {/* The title of the list */}
      {(!!listItems.length || !!emptyStateText) && (
        <Text h3 styleClassName="mb-4 ml-6">
          {title} {showCount ? `(${listItems.length})` : ''}
        </Text>
      )}

      {/* The empty state text */}
      {emptyStateText && !listItems.length ? (
        <View className="bg-neutral-100 mx-6 p-3 flex-row rounded-xl">
          <Icon icon="infoCircle" containerClassName="mr-2" color={colors.neutral[500]} />
          <Text body>{emptyStateText}</Text>
        </View>
      ) : (
        <FlatList
          data={listItems}
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}
