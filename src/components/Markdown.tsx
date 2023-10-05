import * as Linking from 'expo-linking'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import MarkdownRenderer, { MarkdownProps } from 'react-native-markdown-display'
import { colors } from '~/theme'

export const Markdown: FC<{ text: string }> = ({ text }) => {
  const handleLink = async (url: string) => {
    if (url.startsWith('http')) {
      await WebBrowser.openBrowserAsync(url)
    } else if (url.startsWith('/')) {
      router.push(url as any)
    }
  }

  return (
    text && (
      <MarkdownRenderer style={$styles} onLinkPress={(url) => handleLink(url)}>
        {text}
      </MarkdownRenderer>
    )
  )
}

const $styles: MarkdownProps['style'] = {
  heading1: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 28,
    lineHeight: 34,
  },
  heading2: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 24,
    lineHeight: 30,
  },
  heading3: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 20,
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
