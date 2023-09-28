import typography from '../theme/typography'
import React from 'react'
import { Text as RNText, TextStyle } from 'react-native'

interface TextProps {
  styleClassName?: string
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  body?: boolean
  largeHeading?: boolean
  children: React.ReactNode
  weight?: 'bold' | 'normal' | 'light' | 'medium'
}

export default function Text({
  h1,
  h2,
  h3,
  h4,
  body,
  largeHeading,
  children,
  styleClassName,
  weight,
}: TextProps) {
  const sizes = {
    largeHeading: { fontSize: 34, fontFamily: typography?.primary?.bold },
    h1: { fontSize: 28, fontFamily: typography?.primary?.bold },
    h2: { fontSize: 24, fontFamily: typography?.primary?.bold },
    h3: { fontSize: 20, fontFamily: typography?.primary?.bold },
    h4: { fontSize: 14, fontFamily: typography?.primary?.bold },
    body: {
      fontSize: 16,
      fontFamily: typography?.primary?.normal,
      lineHeight: 20,
    },
  }

  const combinedStyle: TextStyle[] = [
    h1 && sizes.h1,
    h2 && sizes.h2,
    h3 && sizes.h3,
    h4 && sizes.h4,
    body && sizes.body,
    largeHeading && sizes.largeHeading,
  ]

  const defaultClassName = 'text-navy'

  if (weight) {
    combinedStyle.push({ fontFamily: typography.primary[weight] })
  }

  return (
    <RNText style={combinedStyle} className={`${defaultClassName} ${styleClassName}`}>
      {children}
    </RNText>
  )
}
