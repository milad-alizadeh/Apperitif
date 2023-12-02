import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React, { ComponentType, FC, PropsWithChildren } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import _MarkdownRenderer, { MarkdownProps } from 'react-native-markdown-display'
import { useAnalytics } from '~/hooks/useAnalytics'
import { colors } from '~/theme'
import { SkeletonView } from './SkeletonView'

type MarkdownWithChildrenT = ComponentType<PropsWithChildren<MarkdownProps>>
const MarkdownRenderer = _MarkdownRenderer as MarkdownWithChildrenT

interface Props {
  text: string
  loading?: boolean
  skeletonLinesNumber?: number
  testID?: string
  externalLinkEventLabel?: string
}

export const Markdown: FC<Props> = ({
  text,
  loading,
  externalLinkEventLabel,
  skeletonLinesNumber = 3,
  testID,
}) => {
  const { capture } = useAnalytics()
  const [skeletonWidth, setSkeletonWidth] = React.useState(200)

  const handleLink = (url: string) => {
    if (url.startsWith('http')) {
      externalLinkEventLabel && capture(externalLinkEventLabel, { url })
      WebBrowser.openBrowserAsync(url)
    } else if (url.startsWith('/')) {
      router.push(url as any)
    }
    return false
  }

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        setSkeletonWidth(e.nativeEvent.layout.width)
      }}
    >
      {loading
        ? Array.from({ length: skeletonLinesNumber }).map((_, index) => (
            <SkeletonView
              key={index}
              height={16}
              style={{ marginBottom: 12 }}
              width={
                skeletonLinesNumber - 1 === index && skeletonLinesNumber > 1
                  ? (skeletonWidth * 3) / 4
                  : skeletonWidth
              }
            />
          ))
        : text && (
            <View testID={testID}>
              <MarkdownRenderer style={$styles} onLinkPress={(url) => handleLink(url)}>
                {text}
              </MarkdownRenderer>
            </View>
          )}
    </View>
  )
}

const $styles: MarkdownProps['style'] = {
  heading1: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 24,
    lineHeight: 30,
  },
  heading2: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 20,
    lineHeight: 24,
  },
  heading3: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 20,
  },
  hr: {
    backgroundColor: colors.neutral[300],
    height: 1,
    marginHorizontal: 24,
    marginVertical: 16,
    marginTop: 8,
  },
  link: {
    color: colors.primary,
  },
  list_item: {
    marginBottom: 8,
  },
}
