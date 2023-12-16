import React, { RefObject, createRef, useEffect, useMemo, useRef, useState } from 'react'
import { AccessibilityRole, FlatList, View, useWindowDimensions } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { colors } from '~/theme'
import { SectionHeaderItem } from '../SectionHeaderItem'

export interface SectionHeaderProps {
  sectionTitles: string[]
  sectionListRef?: RefObject<any>
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  setIsNavScroll?: (v: boolean) => void
  scrollOffset?: number
  scrollEnabled?: boolean
  className?: string
  styleClassName?: string
  onLayoutCalculated?: () => void
  accessibilityRole?: AccessibilityRole
}

/**
 * A component that renders a list of section headers.
 */
export const SectionHeader = function SectionHeader({
  sectionTitles,
  sectionListRef,
  activeIndex,
  setActiveIndex,
  setIsNavScroll,
  scrollOffset,
  styleClassName,
  scrollEnabled = true,
  onLayoutCalculated,
  accessibilityRole = 'menu',
}: SectionHeaderProps) {
  const [measures, setMeasures] = useState<{ x: number; width: number }[]>(
    new Array(sectionTitles.length).fill(null),
  )
  const containerRef = useRef<View>(null)
  const listRef = useRef<FlatList<any>>(null)
  const indicatorPos = useSharedValue({ width: 0, x: 0 })
  const refs = useMemo(() => sectionTitles.map(() => createRef<View>()), [])
  const [containerX, setContainerX] = useState(-1)
  const [containerWidth, setContainerWidth] = useState(0)

  // Measure the x position of the FlatList on its layout
  const onContainerLayout = () => {
    containerRef?.current?.measure((fx, fy, width, height, px) => {
      setContainerWidth(width)
      setContainerX(px)
    })
  }

  useEffect(() => {
    const minItemsToCheck = Math.min(4, sectionTitles.length)
    if (measures.slice(0, minItemsToCheck).every((measure) => measure)) {
      if (containerX === -1) return
      onLayoutCalculated && onLayoutCalculated()
    }
  }, [measures, containerX])

  const onHeaderItemLayout = (index) => {
    refs[index].current?.measure((fx, fy, width, height, px) => {
      const x = px // This gives the x position of the item relative to the FlatList

      if (measures[index]) return

      setMeasures((prev) => {
        const ms = [...prev]
        ms[index] = { x, width }
        return ms
      })
    })
  }

  useEffect(() => {
    if (activeIndex < 0) return
    // Scroll to the active item
    if (scrollEnabled && sectionTitles.length > 1) {
      listRef?.current?.scrollToIndex({
        index: activeIndex,
        animated: true,
        viewOffset: 0,
        viewPosition: 0,
      })
    }

    // Set the position of indicator
    if (measures[activeIndex])
      indicatorPos.value = {
        width: measures[activeIndex].width,
        x: measures[activeIndex].x - containerX,
      }
  }, [activeIndex])

  const style = useAnimatedStyle(() => {
    const { x, width } = indicatorPos.value
    return {
      width: withTiming(width),
      transform: [{ translateX: withTiming(x) }],
    }
  })

  return (
    <View
      ref={containerRef}
      onLayout={onContainerLayout}
      className={styleClassName}
      testID="section-header"
    >
      {!scrollEnabled ? (
        <View
          className="flex-row border-b-[3px] border-neutral-100"
          accessibilityRole={accessibilityRole}
        >
          <Animated.View
            className="bg-primary h-[3px] absolute left-0 -bottom-[3px]"
            style={style}
          />

          {sectionTitles.map((title, index) => (
            <View className="py-1 flex-1" key={title}>
              <SectionHeaderItem
                label={title}
                active={activeIndex === index}
                ref={refs[index]}
                onLayout={() => onHeaderItemLayout(index)}
                style={{ marginLeft: 0 }}
                onPress={() => {
                  if (sectionListRef) {
                    setIsNavScroll && setIsNavScroll(true)
                    const sectionOffset =
                      sectionListRef?.current?.getItemOffset({
                        index: 0,
                        section: index,
                      }) - scrollOffset
                    sectionListRef?.current?.scrollToOffset({
                      offset: sectionOffset,
                      animated: true,
                    })
                  }
                  setActiveIndex(index)
                }}
              />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          horizontal
          data={sectionTitles}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          ref={listRef}
          scrollEnabled={scrollEnabled}
          className="w-full"
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
                  onLayout={() => onHeaderItemLayout(index)}
                  onPress={() => {
                    if (sectionListRef) {
                      setIsNavScroll && setIsNavScroll(true)
                      const sectionOffset =
                        sectionListRef?.current?.getItemOffset({
                          index: 0,
                          section: index,
                        }) - scrollOffset
                      sectionListRef?.current?.scrollToOffset({
                        offset: sectionOffset,
                        animated: true,
                      })
                    }
                    setActiveIndex(index)
                  }}
                />
              </>
            )
          }}
        />
      )}
    </View>
  )
}
