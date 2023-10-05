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
    } else {
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
  body: {
    fontSize: 16,
    lineHeight: 20,
  },
  link: {
    color: colors.primary,
  },
}
