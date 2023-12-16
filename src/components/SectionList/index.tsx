import React, { FC, useCallback, useRef, useState } from 'react'
import { View, ViewStyle, ViewToken, useWindowDimensions } from 'react-native'
import BigList from 'react-native-big-list'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAnalytics } from '~/hooks/useAnalytics'
import { SelectedItems } from '~/hooks/useFetchIngredients'
import { shadowCard, shadowHeader } from '~/theme/shadows'
import { BouncyImage } from '../BouncyImage'
import { Button } from '../Button'
import { SearchBar } from '../SearchBar'
import { Text } from '../Text'
import { SectionHeader } from './SectionHeader'

export interface SectionDataType {
  id: string
  name: string
}

export interface SectionHeaderType {
  id: string
  title: string
  count: number
}

export interface SectionListProps {
  contentContainerStyle?: ViewStyle
  headerHeight?: number
  ListEmptyComponent?: JSX.Element
  ListFooterComponent?: JSX.Element
  ListHeaderComponent?: JSX.Element
  loading?: boolean
  onSave?: (selectedItems: SelectedItems) => void
  onSearch?: (value: string) => void
  renderItem: (item: any) => JSX.Element
  searchQuery?: string
  sectionsData: SectionDataType[][]
  sectionsHeader: SectionHeaderType[]
  selectedItems?: SelectedItems
  showHeader?: boolean
  onRefresh?: () => void
  showHeaderCount?: boolean
}

const FIXED_HEADER_HEIGHT = 40
const SEARCH_SCROLL_OFFSET = 240
const SECTION_HEADER_HEIGHT = 80
const ITEM_HEIGHT = 60

/**
 *  A component used to show a list of items with sections.
 */
export const SectionList: FC<SectionListProps> = ({
  sectionsData,
  sectionsHeader,
  onSearch,
  onSave,
  selectedItems,
  showHeader,
  renderItem,
  loading,
  ListHeaderComponent,
  ListEmptyComponent,
  ListFooterComponent,
  headerHeight,
  contentContainerStyle,
  onRefresh,
  showHeaderCount = true,
}) => {
  const { capture } = useAnalytics()
  const inset = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(-1)
  const defaultHeaderHeight = useWindowDimensions().width - FIXED_HEADER_HEIGHT
  const footerHeight = inset.bottom + 60
  const isNavScroll = useRef(false)
  const navOpacity = useSharedValue<number>(1)
  const sectionListRef = useRef<BigList>(null)

  // Show the button
  const hasSelection = selectedItems ? !!Object.values(selectedItems).length : false

  const navAnimatedStyle = useAnimatedStyle(() => ({
    opacity: navOpacity.value,
  }))

  const onCheckViewableItems = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (activeIndex < 0) return
    if (isNavScroll?.current) return

    if (viewableItems[0]) {
      const activeIndex = viewableItems[0].section
      setActiveIndex(activeIndex < 0 ? 0 : activeIndex)
    }
  }

  const setIsNavScroll = useCallback((v: boolean) => {
    isNavScroll.current = v
  }, [])

  const renderSectionHeader = useCallback(
    (sectionIndex) => {
      if (!sectionsHeader[sectionIndex])
        return (
          <View
            className="bg-white rounded-t-[50px] overflow-hidden"
            style={{ height: SECTION_HEADER_HEIGHT }}
          />
        )
      const { title, count } = sectionsHeader[sectionIndex]

      return (
        <View
          className="bg-white rounded-t-[50px] overflow-hidden"
          style={{ height: SECTION_HEADER_HEIGHT }}
        >
          <Text h3 styleClassName={`px-6 pb-4 pt-8 h-20 ${!count ? 'opacity-0' : ''}`}>{`${title}${
            showHeaderCount ? ` (${count})` : ''
          }`}</Text>
        </View>
      )
    },
    [sectionsHeader, sectionsData],
  )

  const defaultListHeaderComponent = () =>
    showHeader && (
      <View>
        <View className="scale-125 -translate-y-8" style={{ top: FIXED_HEADER_HEIGHT }}>
          <BouncyImage
            height={defaultHeaderHeight}
            imageUrl={require('~assets/images/whiskey-bottle.jpg')}
          />
        </View>

        <View
          className="flex-row bg-white rounded-lg mx-6 absolute bottom-6"
          style={{ ...shadowCard }}
        >
          <SearchBar
            onChange={onSearch}
            testId="search-bar"
            onFocus={() => {
              capture('add_ingredients:search_press')
              navOpacity.value = withTiming(0, { duration: 200 })
              sectionListRef.current?.scrollToOffset({
                offset: SEARCH_SCROLL_OFFSET,
                animated: true,
              })
            }}
            onBlur={() => {
              if (sectionsData.length > 1) {
                navOpacity.value = withTiming(1, { duration: 200 })
              }
            }}
          />
        </View>
      </View>
    )
  return (
    <View className="flex-1">
      {showHeader && (
        <Animated.View
          style={[navAnimatedStyle, { ...shadowHeader, top: FIXED_HEADER_HEIGHT }]}
          className="bg-white z-10 border-t-[1px] border-neutral-100 opacity-1"
        >
          <SectionHeader
            sectionTitles={sectionsHeader.map(({ title }) => title)}
            sectionListRef={sectionListRef}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setIsNavScroll={setIsNavScroll}
            onLayoutCalculated={() => setActiveIndex(0)}
            scrollOffset={FIXED_HEADER_HEIGHT + SECTION_HEADER_HEIGHT}
          />
        </Animated.View>
      )}

      {!!hasSelection && showHeader && (
        <View
          style={{ paddingBottom: inset.bottom }}
          className="absolute bottom-3 w-full z-20 px-6"
        >
          <Button
            testID="save-selection-button"
            label="Save Selection"
            large
            enableHaptics
            loading={loading}
            onPress={() => {
              onSave(selectedItems)
            }}
          />
        </View>
      )}

      <BigList
        sections={
          sectionsData.length !== 1
            ? sectionsData
            : [
                ...sectionsData,
                [
                  { id: '1', name: '' },
                  { id: '2', name: '' },
                  { id: '3', name: '' },
                  { id: '4', name: '' },
                ],
              ]
        }
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="handled"
        ref={sectionListRef}
        onRefresh={onRefresh}
        onScrollBeginDrag={() => {
          if (isNavScroll?.current) {
            setIsNavScroll(false)
          }
        }}
        ListEmptyComponent={ListEmptyComponent}
        onViewableItemsChanged={onCheckViewableItems}
        contentContainerStyle={
          contentContainerStyle ?? {
            minHeight: useWindowDimensions().height / 2,
          }
        }
        keyExtractor={(item) => item.id}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        renderFooter={() => null}
        renderHeader={() => null}
        itemHeight={ITEM_HEIGHT}
        headerHeight={headerHeight ?? defaultHeaderHeight}
        footerHeight={footerHeight}
        sectionHeaderHeight={SECTION_HEADER_HEIGHT}
        ListHeaderComponent={ListHeaderComponent ?? defaultListHeaderComponent()}
        ListFooterComponent={ListFooterComponent ?? <View className="h-96 bg-white" />}
      />
    </View>
  )
}
