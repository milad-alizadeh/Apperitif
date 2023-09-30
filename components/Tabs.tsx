import { set } from 'lodash'
import React, {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from 'react'
import { View } from 'react-native'
import { SectionHeader } from './SectionList/SectionHeader'

interface TabProps {
  children: ReactNode
}

interface TabPageProps {
  title: string
  initialIndex?: boolean
  children: ReactNode
}

interface TabBarProps {
  sectionTitles?: string[]
  setActiveIndex?: (index: number) => void
  activeIndex?: number
  initialIndex?: number
}

const TabBar: React.FC<TabBarProps> = ({
  sectionTitles,
  setActiveIndex,
  activeIndex,
  initialIndex,
}) => {
  return (
    <SectionHeader
      styleClassName="border-b-[1px] border-neutral-100"
      sectionTitles={sectionTitles}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      onLayoutCalculated={() => setActiveIndex(initialIndex || 0)}
      scrollEnabled={false}
    />
  )
}

const TabPage: React.FC<TabPageProps> = ({ children }) => {
  return <View className="flex-1 min-h-[200px]">{children}</View>
}

export const Tabs: React.FC<TabProps> & { TabPage: typeof TabPage; TabBar: typeof TabBar } = ({
  children,
}) => {
  // Set the initial active index to the first TabPage with the initialIndex prop or 0 if none is found
  const initialIndex = Children.toArray(children).findIndex(
    (child) => isValidElement(child) && child.type === TabPage && child.props.initialIndex,
  )
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const pages: TabPageProps[] = []
  let tabBar: ReactNode = null

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === TabPage) {
        pages.push(child.props)
      } else if (child.type === TabBar) {
        tabBar = child
      } else {
        throw new Error('Tabs component can only have TabPage and TabBar as children')
      }
    }
  })

  if (pages.length === 0) {
    throw new Error('At least one TabPage is required')
  }

  const titles = pages.map((p) => p.title)
  tabBar = tabBar
    ? cloneElement(tabBar as React.ReactElement<TabBarProps>, {
        sectionTitles: titles,
        activeIndex,
        setActiveIndex,
        initialIndex,
      })
    : null

  return (
    <View>
      {tabBar}
      {pages[activeIndex] && <TabPage {...pages[activeIndex]} />}
    </View>
  )
}

Tabs.TabPage = TabPage
Tabs.TabBar = TabBar
