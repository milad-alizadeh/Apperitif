import * as React from 'react'
import { FlatList, View } from 'react-native'
import { ListItem, ListItemProps, Text } from '.'

export interface VerticalListProps {
  /** An array of objects representing the list items to be displayed */
  listItems: ListItemProps[]
  /** The title of the list */
  title: string
  /** An optional class name to apply to the root View component */
  styleClassName?: string
  /** The number of columns to display in the list */
  numColumns?: number
  /** Whether to use a FlatList component instead of a regular View component */
  flatlist?: boolean
  /** A function that is called when a list item is pressed */
  onPress?: (id: string) => void
  /** Whether to show the count of items in the list */
  showCount?: boolean
}

/**
 * A component that displays a vertical list of items
 */
export const VerticalList = function VerticalList({
  listItems,
  title,
  styleClassName,
  numColumns = 1,
  flatlist,
  showCount = true,
}: VerticalListProps) {
  return (
    <View className={styleClassName}>
      <Text h3 styleClassName="mb-4">
        {title} {showCount ? `(${listItems.length})` : ''}
      </Text>
      {flatlist ? (
        <FlatList
          data={listItems}
          nestedScrollEnabled
          numColumns={numColumns}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <ListItem {...item} card small enableHaptics={false} />
          }}
        />
      ) : (
        <View className={`flex ${numColumns === 2 ? 'flex-row flex-wrap -mx-2' : ''}`}>
          {listItems.map((item) => (
            <View key={item.id} className={`mb-4  ${numColumns === 2 ? 'w-[50%] px-2' : ''}`}>
              <ListItem {...item} card small enableHaptics={false} />
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
