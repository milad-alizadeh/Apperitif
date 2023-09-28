import * as React from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { colors, typography } from 'app/theme'
import { Text } from 'app/components/Text'

export interface FilterBadgeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FilterBadge = observer(function FilterBadge(props: FilterBadgeProps) {
  return <View></View>
})
