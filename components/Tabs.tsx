import React, { ReactNode, useEffect, useState } from 'react'
import { FlatList, LayoutChangeEvent, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { SectionHeader } from './SectionList/SectionHeader'

const ANIMATION_DAMPING = 18

interface TabProps {
  pages: TabPageProps[]
  enableTabBar?: boolean
}

interface TabPageProps {
  title?: string
  initialIndex?: boolean
  style?: ViewStyle
  TabContent?: () => ReactNode
  children?: ReactNode
}

const TabPage: React.FC<TabPageProps> = ({ children, style }) => {
  return (
    <View className="flex-1 min-h-[200px]" style={style}>
      {children}
    </View>
  )
}

export const Tabs: React.FC<TabProps> = ({ pages, enableTabBar = true }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [tabWidth, setTabWidth] = useState<number>(200)
  const [initialIndex, setInitialIndex] = useState<number>(0)

  useEffect(() => {
    const initialIndex = pages.findIndex((page) => page.initialIndex)
    setInitialIndex(initialIndex)
  }, [])

  // Calculate the width the container
  const onContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }

  // Calculate the width of the tab containers
  useEffect(() => {
    if (containerWidth) setTabWidth(containerWidth * pages.length)
  }, [containerWidth])

  // Animate the tab container when the active index changes
  useEffect(() => {
    translateX.value = withSpring(-containerWidth * activeIndex, { damping: ANIMATION_DAMPING })
  }, [activeIndex])

  const translateX = useSharedValue(0)

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = -containerWidth * activeIndex + event.translationX
    })
    .onEnd((event) => {
      let newActiveIndex = activeIndex
      const threshold = 50
      if (event.velocityX < -threshold && activeIndex < pages.length - 1) {
        newActiveIndex = activeIndex + 1
      } else if (event.velocityX > threshold && activeIndex > 0) {
        newActiveIndex = activeIndex - 1
      }
      runOnJS(setActiveIndex)(newActiveIndex)
      translateX.value = withSpring(-containerWidth * newActiveIndex, {
        velocity: event.velocityX,
        damping: ANIMATION_DAMPING,
      })
    })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const renderTabPages = ({ item }) => {
    return (
      <TabPage style={{ width: containerWidth, maxWidth: containerWidth }}>
        {<item.TabContent />}
      </TabPage>
    )
  }

  return (
    <View onLayout={onContainerLayout} className="overflow-hidden">
      {enableTabBar && (
        <SectionHeader
          styleClassName="border-b-[1px] border-neutral-100"
          sectionTitles={pages.map((page) => page.title)}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onLayoutCalculated={() => setActiveIndex(initialIndex || 0)}
          scrollEnabled={false}
        />
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[animatedStyle, { width: tabWidth }]}>
          <FlatList
            horizontal
            data={pages}
            renderItem={renderTabPages}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}
