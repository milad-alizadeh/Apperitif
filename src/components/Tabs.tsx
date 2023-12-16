import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, LayoutChangeEvent, View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { SectionHeader } from './SectionList/SectionHeader'

interface TabProps {
  children: ReactNode
  initialIndex?: number
  styleClassName?: string
}

interface TabPageProps {
  /** The content to render inside the TabPage. */
  children: ReactNode
  /** The width of the Tabs container. */
  containerWidth?: number
  /** The title of the TabPage used to create Tab Navigation */
  title?: string
  /** The style class name to apply to the TabPage. */
  styleClassName?: string
}

const TabPage: FC<TabPageProps> = ({ children, containerWidth, styleClassName }) => {
  return (
    <View
      accessibilityRole="tab"
      className={`p-6 w-full ${styleClassName}`}
      style={{ width: containerWidth }}
    >
      {children}
    </View>
  )
}

export const Tabs: FC<TabProps> & { TabPage: FC<TabPageProps> } = ({
  children,
  initialIndex = 0,
  styleClassName,
}) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)
  const scrollX = useSharedValue(0)
  const scrollViewRef = useRef<Animated.ScrollView>(null)
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false)

  const onContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }
  // Extract the section titles from the TabPage children
  const sectionTitles = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabPage) return child.props.title
    return null
  })

  // Scroll to the correct tab when the user clicks on a section header
  const onSectionClick = (index: number) => {
    setActiveIndex(index)
    scrollViewRef.current?.scrollTo({ x: index * containerWidth, animated: true })
  }

  // Scroll to the correct tab when the user swipes
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  // Round the scrollX value to the nearest tab index
  const activeIndexDerived = useDerivedValue(() => {
    return Math.round(scrollX.value / containerWidth)
  })

  // When the activeIndexDerived value changes, update the activeIndex state
  useAnimatedReaction(
    () => activeIndexDerived.value,
    (newActiveIndex) => {
      if (
        newActiveIndex !== activeIndex &&
        !Number.isNaN(newActiveIndex) &&
        activeIndex >= 0 &&
        !screenReaderEnabled
      ) {
        runOnJS(setActiveIndex)(newActiveIndex)
      }
    },
  )

  useEffect(() => {
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (isScreenReaderEnabled) => {
        setScreenReaderEnabled(isScreenReaderEnabled)
      },
    )

    AccessibilityInfo.isScreenReaderEnabled().then((isScreenReaderEnabled) => {
      setScreenReaderEnabled(isScreenReaderEnabled)
    })

    return () => {
      screenReaderChangedSubscription.remove()
    }
  }, [])

  return (
    <View className={styleClassName} onLayout={onContainerLayout} style={{ overflow: 'hidden' }}>
      <SectionHeader
        sectionTitles={sectionTitles}
        activeIndex={activeIndex}
        styleClassName="border-b-[1px] border-neutral-100"
        setActiveIndex={onSectionClick}
        onLayoutCalculated={() => onSectionClick(initialIndex)}
        scrollEnabled={false}
        accessibilityRole="menu"
      />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        accessibilityRole="tablist"
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<TabPageProps>(child) && child.type === TabPage) {
            return React.cloneElement(child, { containerWidth })
          }
          return child
        })}
      </Animated.ScrollView>
    </View>
  )
}

Tabs.TabPage = TabPage

export default Tabs
