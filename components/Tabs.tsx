import React, { FC, ReactNode, useRef, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
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
}

interface TabPageProps {
  children: ReactNode
  containerWidth?: number
  title?: string
}

const TabPage: FC<TabPageProps> = ({ children, containerWidth }) => {
  return (
    <View className="p-6" style={{ width: containerWidth }}>
      {children}
    </View>
  )
}

export const Tabs: FC<TabProps> & { TabPage: FC<TabPageProps> } = ({
  children,
  initialIndex = 0,
}) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const scrollX = useSharedValue(0)
  const scrollViewRef = useRef<Animated.ScrollView>(null)

  const onContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }

  const onSectionClick = (index: number) => {
    setActiveIndex(index)
    scrollViewRef.current?.scrollTo({ x: index * containerWidth, animated: true })
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const activeIndexDerived = useDerivedValue(() => {
    return Math.round(scrollX.value / containerWidth)
  })

  useAnimatedReaction(
    () => activeIndexDerived.value,
    (newActiveIndex) => {
      if (newActiveIndex !== activeIndex) {
        runOnJS(setActiveIndex)(newActiveIndex) // Use runOnJS to safely update state
      }
    },
  )

  const sectionTitles = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabPage) return child.props.title
    return null
  })

  return (
    <View onLayout={onContainerLayout} style={{ overflow: 'hidden' }}>
      <SectionHeader
        sectionTitles={sectionTitles}
        activeIndex={activeIndex}
        styleClassName="border-b-[1px] border-neutral-100"
        setActiveIndex={onSectionClick}
        onLayoutCalculated={() => onSectionClick(initialIndex)}
        scrollEnabled={false}
      />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
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
