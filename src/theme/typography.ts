// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here
import { Platform } from 'react-native'

export const customFontsToLoad = {
  interLight: require('~assets/fonts/Inter-Light.ttf'),
  interRegular: require('~assets/fonts/Inter-Regular.ttf'),
  interMedium: require('~assets/fonts/Inter-Medium.ttf'),
  interBold: require('~assets/fonts/Inter-Bold.ttf'),
}

const fonts = {
  helveticaNeue: {
    // iOS only font.
    thin: 'HelveticaNeue-Thin',
    light: 'HelveticaNeue-Light',
    normal: 'Helvetica Neue',
    medium: 'HelveticaNeue-Medium',
    bold: 'HelveticaNeue-Bold',
  },
  courier: {
    // iOS only font.
    normal: 'Courier',
  },
  sansSerif: {
    light: 'interLight',
    normal: 'interRegular',
    medium: 'interMedium',
    bold: 'interBold',
  },
  monospace: {
    // Android only font.
    normal: 'monospace',
  },
}

export default {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
