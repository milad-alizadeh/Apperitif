import { LinearGradient } from 'expo-linear-gradient'
import * as React from 'react'
import { ViewStyle } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { colors } from '~/theme'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export interface SkeletonViewProps {
  className?: string
  visible?: boolean
  children?: React.ReactNode
  style?: ViewStyle
  width?: number
  height?: number
}

/**
 * Describe your component here
 */
export const SkeletonView = function SkeletonView({
  visible,
  children,
  style,
  width,
  height,
}: SkeletonViewProps) {
  const shimmerColors = [colors.neutral[200], colors.neutral[100], colors.neutral[200]]

  return (
    <ShimmerPlaceholder
      style={style}
      height={height}
      visible={visible}
      width={width}
      shimmerColors={shimmerColors}
    >
      {children}
    </ShimmerPlaceholder>
  )
}
