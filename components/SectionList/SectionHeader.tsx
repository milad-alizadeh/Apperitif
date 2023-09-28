import { observer } from 'mobx-react-lite'
import React, { RefObject, createRef, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, View, useWindowDimensions } from 'react-native'
import Biglist from 'react-native-big-list'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { SectionHeaderItem } from './SectionHeaderItem'

export interface SectionHeaderProps {
  sectionTitles: string[]
  sectionListRef: RefObject<Biglist>
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  setIsNavScroll: (v: boolean) => void
  scrollOffset: number
}

/**
 * A component that renders a list of section headers.
 */
export const SectionHeader = observer(function SectionHeader({
  sectionTitles,
  sectionListRef,
  activeIndex,
  setActiveIndex,
  setIsNavScroll,
  scrollOffset,
}: SectionHeaderProps) {
  const [measures, setMeasures] = useState<{ x: number; width: number }[]>(
    new Array(sectionTitles.length).fill(null),
  )
  const containerRef = useRef<FlatList<any>>(null)
  const indicatorPos = useSharedValue({ width: 0, x: 0 })
  const refs = useMemo(() => sectionTitles.map(() => createRef<View>()), [])

  useEffect(() => {
    if (activeIndex < 0) return
    // Scroll to the active item
    containerRef?.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
      viewOffset: 0,
      viewPosition: 0,
    })

    // Set the position of indicator
    if (measures[activeIndex]) indicatorPos.value = measures[activeIndex]
  }, [activeIndex])

  const style = useAnimatedStyle(() => {
    const { x, width } = indicatorPos.value
    return {
      width: withTiming(width),
      transform: [{ translateX: withTiming(x) }],
    }
  })

  return (
    <View>
      <FlatList
        horizontal
        data={sectionTitles}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        ref={containerRef}
        ListFooterComponent={
          <View className="h-5" style={{ width: useWindowDimensions().width }} />
        }
        renderItem={({ item, index }) => {
          return (
            <>
              {index === 0 && (
                <Animated.View
                  className="bg-primary h-[3px] absolute left-0 bottom-0"
                  style={style}
                />
              )}

              <SectionHeaderItem
                label={item}
                active={activeIndex === index}
                ref={refs[index]}
                onLayout={() => {
                  refs[index].current?.measure((fx, fy, width, height, px) => {
                    const x = px // This gives the x position of the item relative to the FlatList
                    if (measures[index]) return

                    setMeasures((prev) => {
                      const ms = [...prev]
                      ms[index] = { x, width }
                      return ms
                    })

                    // Check if all items have been measured
                    if (measures.slice(0, 5).every((measure) => measure) && activeIndex !== 0) {
                      setActiveIndex(0)
                    }
                  })
                }}
                onPress={() => {
                  setIsNavScroll(true)
                  console.log('onNavPress')
                  const sectionOffset =
                    sectionListRef?.current?.getItemOffset({
                      index: 0,
                      section: index,
                    }) - scrollOffset
                  sectionListRef?.current?.scrollToOffset({ offset: sectionOffset, animated: true })
                  setActiveIndex(index)
                }}
              />
            </>
          )
        }}
      />
    </View>
  )
})
