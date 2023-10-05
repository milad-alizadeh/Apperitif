import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { ListItem } from '~/components/ListItem'
import { Text } from '~/components/Text'
import { shadowCard } from '~/theme/shadows'

interface AccordionProps {
  content: {
    title: string
    description: string
  }[]
}

interface AccordionItemProps {
  title: string
  description: string
  isExpanded: boolean
  onLayout: (e: LayoutChangeEvent, index: number) => void
  index: number
  toggleExpand: (title: string) => void
}

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  description,
  isExpanded,
  onLayout,
  index,
  toggleExpand,
}) => {
  const height = useSharedValue(0)
  const [isMeasured, setIsMeasured] = useState(false)
  const opacity = useSharedValue(0)

  const calculateHeight = (e: LayoutChangeEvent) => {
    height.value = e.nativeEvent.layout.height
    setTimeout(() => {
      opacity.value = 1
    }, 200)
    setIsMeasured(true)
  }

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: isExpanded ? withTiming(height.value) : withTiming(0),
      opacity: withTiming(opacity.value),
    }
  })

  const containerOpacity = useAnimatedStyle(() => {
    return {
      height: isExpanded ? withTiming(height.value) : withTiming(0),
      opacity: withTiming(opacity.value),
    }
  })

  return (
    <Animated.View key={title} className="mb-3">
      <ListItem
        name={title}
        card
        rightIcon={!isExpanded ? 'chevronDown' : 'chevronUp'}
        onPress={() => toggleExpand(title)}
        styleClassName="py-3 z-10"
      />
      <View style={{ ...shadowCard }} className="bg-white rounded-b-xl -top-3">
        <Animated.View style={[heightStyle, { overflow: 'hidden' }]}>
          <View className="px-3 pt-12 -mt-6">
            <Text body>{description}</Text>
          </View>
        </Animated.View>

        {!isMeasured && (
          <View className="px-3 pt-12 -mt-6 absolute top-full" onLayout={calculateHeight}>
            <Text body>{description}</Text>
          </View>
        )}
      </View>
    </Animated.View>
  )
}

export const Accordion: FC<AccordionProps> = ({ content }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [measurements, setMeasurements] = useState<number[]>(Array(content.length).fill(0))

  const toggleExpand = useCallback((title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }))
  }, [])

  const handleItemLayout = (e: LayoutChangeEvent, index: number) => {
    const newMeasurements = [...measurements]
    newMeasurements[index] = e.nativeEvent.layout.height
    setMeasurements(newMeasurements)
  }

  return (
    <View>
      {content.map(({ title, description }, index) => (
        <AccordionItem
          key={index}
          title={title}
          description={description}
          isExpanded={!!expanded[title]}
          onLayout={handleItemLayout}
          index={index}
          toggleExpand={toggleExpand}
        />
      ))}
    </View>
  )
}
