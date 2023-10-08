import React, { FC, forwardRef, useImperativeHandle, useRef } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'

interface RecipeGridProps {
  recipes: any
  pageInfo: any
  loading: any
  error: any
  manualRefresh: any
  refreshing: any
  loadMore: any
  renderItem: any
  ListHeaderComponent: any
  ListEmptyComponent: any
  ListFooterComponent: any
  onScroll: any
  styleClassName: string
}

export const RecipeGrid: FC<RecipeGridProps> = forwardRef(
  (
    {
      ListEmptyComponent,
      ListFooterComponent,
      ListHeaderComponent,
      loadMore,
      manualRefresh,
      onScroll,
      recipes,
      refreshing,
      renderItem,
      styleClassName,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        listRef?.current?.scrollToOffset({ animated: true, offset: 0 })
      },
    }))

    const listRef = useRef(null)

    return (
      <Animated.FlatList
        ref={listRef}
        data={recipes}
        numColumns={2}
        windowSize={10}
        nestedScrollEnabled
        className={styleClassName}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent ?? <View className="h-20"></View>}
        ListEmptyComponent={ListEmptyComponent}
      />
    )
  },
)
