import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { ListItem } from '~/components/ListItem'
import { Text } from '~/components/Text'
import { shadowCard } from '~/theme/shadows'

interface AccordionProps {
  /** The content of the accordion */
  content: {
    title: string
    description: string
  }[]
  onTitlePress?: (title: string) => void
}

interface AccordionItemProps {
  /** The title of the accordion item */
  title: string
  /** The description of the accordion item */
  description: string
  /** Whether the accordion item is expanded */
  isExpanded: boolean
  /** Callback to toggle the accordion item */
  toggleExpand: (title: string) => void
}

/**
 * Accordion component that displays a list of items that can be expanded
 */
export const AccordionItem: FC<AccordionItemProps> = ({
  title,
  description,
  isExpanded,
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
    }
  })

  const containerOpacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value),
    }
  })

  return (
    <Animated.View key={title} style={containerOpacity} className="mb-3">
      <ListItem
        name={title}
        card
        rightIcon={!isExpanded ? 'chevronDown' : 'chevronUp'}
        onPress={() => {
          toggleExpand(title)
        }}
        styleClassName="py-3 z-10"
        testID={`accordion-content-${title}`}
      />
      <View style={{ ...shadowCard }} className="bg-white dark:bg-neutral-700 rounded-b-xl -top-3">
        <Animated.View testID="accordion-content" style={[heightStyle, { overflow: 'hidden' }]}>
          <View className="px-3 pt-12 -mt-6">
            <Text body>{description}</Text>
          </View>
        </Animated.View>

        {!isMeasured && (
          <View className="px-3 pt-12 -mt-6 absolute top-full" onLayout={calculateHeight}>
            <Text body>{description}.</Text>
          </View>
        )}
      </View>
    </Animated.View>
  )
}

export const Accordion: FC<AccordionProps> = ({ content, onTitlePress }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleExpand = useCallback(
    (title: string) => {
      setExpanded((prev) => {
        if (!prev[title]) {
          onTitlePress?.(title)
        }
        return { ...prev, [title]: !prev[title] }
      })
    },
    [expanded],
  )

  return (
    <View>
      {content.map(({ title, description }, index) => (
        <AccordionItem
          key={index}
          title={title}
          description={description}
          isExpanded={!!expanded[title]}
          toggleExpand={toggleExpand}
        />
      ))}
    </View>
  )
}
