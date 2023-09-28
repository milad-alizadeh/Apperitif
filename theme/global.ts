import { ThemeManager, Typography } from 'react-native-ui-lib/core'
import { colors } from './colors'
import { typography } from './typography'

Typography.loadTypographies({
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutral['800'],
    fontFamily: typography.primary.normal,
    textAlignVertical: 'top',
  },
})

ThemeManager.setComponentTheme('Button', (props) => ({
  backgroundColor: colors.primary,
  labelStyle: {
    color: colors.white,
    fontFamily: typography.primary.bold,
    fontSize: props.size === 'large' ? 16 : 14,
    paddingHorizontal: props.size === 'large' ? 16 : 8,
    paddingVertical: props.size === 'large' ? 6 : 4,
  },
}))

ThemeManager.setComponentTheme('SegmentedControl', (props) => ({
  borderRadius: 8,
  backgroundColor: colors.neutral[200],
  outlineColor: colors.primary,
  activeBackgroundColor: colors.primary,
  activeColor: colors.white,
  style: {
    height: 36,
  },
}))

ThemeManager.setComponentTheme('Switch', (props) => ({
  offColor: colors.neutral[200],
  onColor: colors.primary,
}))
