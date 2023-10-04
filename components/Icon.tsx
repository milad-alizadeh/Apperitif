import { Image } from 'expo-image'
import * as React from 'react'
import { ComponentType } from 'react'
import { ImageStyle, StyleProp, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { useHaptic } from '../hooks/useHaptics'

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large'

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  styleClassName?: string

  /**
   * Style overrides for the icon container
   */
  containerClassName?: string

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps['onPress']

  activeOpacity?: TouchableOpacityProps['activeOpacity']

  enableHaptics?: boolean
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 'medium',
    style: $imageStyleOverride,
    containerClassName,
    styleClassName,
    ...WrapperProps
  } = props

  const haptic = useHaptic('medium')

  const styleClassNameBySize = {
    xsmall: 'w-5 h-5',
    small: 'w-6 h-6 p-1',
    medium: 'w-8 h-8 p-1',
    large: 'w-10 h-10 p-2',
  }

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      className={`${styleClassNameBySize[size]} ${containerClassName}`}
      onPress={(e) => {
        if (WrapperProps.enableHaptics) haptic()
        WrapperProps.onPress && WrapperProps.onPress(e)
      }}
    >
      <Image
        className={`w-full h-full items-center justify-center ${styleClassName}`}
        style={[$imageStyle, color && { tintColor: color }, $imageStyleOverride]}
        source={iconRegistry[icon]}
        contentFit="contain"
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  arrowLeft: require('../assets/icons/arrow-left.png'),
  arrowUp: require('../assets/icons/arrow-up.png'),
  bar: require('../assets/icons/bar.png'),
  bookmark: require('../assets/icons/bookmark.png'),
  bookmarkFilled: require('../assets/icons/bookmark-filled.png'),
  champagneFlute: require('../assets/icons/champagne-flute.png'),
  check: require('../assets/icons/check.png'),
  checkCircle: require('../assets/icons/check-circle.png'),
  chevronRight: require('../assets/icons/chevron-right.png'),
  close: require('../assets/icons/close.png'),
  closeFilled: require('../assets/icons/close-filled.png'),
  cocktail: require('../assets/icons/cocktail.png'),
  collins: require('../assets/icons/collins.png'),
  coupe: require('../assets/icons/coupe.png'),
  google: require('../assets/icons/google.png'),
  heart: require('../assets/icons/heart.png'),
  hurricane: require('../assets/icons/hurricane.png'),
  image: require('../assets/icons/image.png'),
  infoCircle: require('../assets/icons/info-circle.png'),
  irishCoffeeMug: require('../assets/icons/irish-coffee-mug.png'),
  jigger: require('../assets/icons/jigger.png'),
  margarita: require('../assets/icons/margarita.png'),
  martini: require('../assets/icons/martini.png'),
  minus: require('../assets/icons/minus.png'),
  minusCircle: require('../assets/icons/minus-circle.png'),
  muddler: require('../assets/icons/muddler.png'),
  mule: require('../assets/icons/mule.png'),
  pint: require('../assets/icons/pint.png'),
  plus: require('../assets/icons/plus.png'),
  plusCircle: require('../assets/icons/plus-circle.png'),
  search: require('../assets/icons/search.png'),
  settings: require('../assets/icons/settings.png'),
  shaker: require('../assets/icons/shaker.png'),
  shot: require('../assets/icons/shot.png'),
  sliders: require('../assets/icons/sliders.png'),
  text: require('../assets/icons/text.png'),
  trash: require('../assets/icons/trash.png'),
  tumbler: require('../assets/icons/tumbler.png'),
  user: require('../assets/icons/user.png'),
  whiteWine: require('../assets/icons/white-wine.png'),
  wine: require('../assets/icons/wine.png'),
}

const $imageStyle: ImageStyle = {
  aspectRatio: 1,
}
