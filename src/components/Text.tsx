import React from 'react'
import { Text as RNText, TextStyle, View } from 'react-native'
import typography from '~/theme/typography'
import { SkeletonView } from './SkeletonView'

interface TextProps {
  styleClassName?: string
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  body?: boolean
  small?: boolean
  largeHeading?: boolean
  loading?: boolean
  skeletonLinesNumber?: number
  skeletonWidth?: number
  children: React.ReactNode
  weight?: 'bold' | 'normal' | 'light' | 'medium'
  testID?: string
}

export function Text({
  h1,
  h2,
  h3,
  h4,
  body,
  loading,
  skeletonLinesNumber = 1,
  skeletonWidth = 200,
  children,
  styleClassName,
  weight,
  testID,
  small,
}: TextProps) {
  const sizes = {
    h1: { fontSize: 26, fontFamily: typography?.primary?.bold, lineHeight: 32 },
    h2: { fontSize: 24, fontFamily: typography?.primary?.bold, lineHeight: 30 },
    h3: { fontSize: 20, fontFamily: typography?.primary?.bold, lineHeight: 24 },
    h4: { fontSize: 16, fontFamily: typography?.primary?.bold, lineHeight: 20 },
    body: {
      fontSize: 16,
      lineHeight: 20,
    },
    small: {
      fontSize: 14,
      lineHeight: 18,
    },
  }

  let height

  if (h1) {
    height = sizes.h1.lineHeight
  } else if (h2) {
    height = sizes.h2.lineHeight
  } else if (h3) {
    height = sizes.h3.lineHeight
  } else if (h4) {
    height = sizes.h4.lineHeight
  } else if (body) {
    height = sizes.body.lineHeight
  } else if (small) {
    height = sizes.small.lineHeight
  }

  const combinedStyle: TextStyle[] = [
    h1 && sizes.h1,
    h2 && sizes.h2,
    h3 && sizes.h3,
    h4 && sizes.h4,
    body && sizes.body,
    small && sizes.small,
  ]

  const defaultClassName = 'text-navy'

  if (weight) {
    combinedStyle.push({ fontFamily: typography.primary[weight] })
  }

  return (
    <>
      {loading ? (
        Array.from({ length: skeletonLinesNumber }).map((_, index) => (
          <SkeletonView
            key={index}
            height={height}
            style={{ marginBottom: 12 }}
            width={
              skeletonLinesNumber - 1 === index && skeletonLinesNumber > 1
                ? (skeletonWidth * 3) / 4
                : skeletonWidth
            }
          />
        ))
      ) : (
        <RNText
          testID={testID}
          style={combinedStyle}
          maxFontSizeMultiplier={1.3}
          className={`${defaultClassName} ${styleClassName}`}
        >
          {children}
        </RNText>
      )}
    </>
  )
}
