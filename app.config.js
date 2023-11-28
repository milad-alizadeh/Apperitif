import 'dotenv/config'

const APP_VARIANT = process.env.APP_VARIANT
const APP_NAME = `Apperitif${APP_VARIANT ? ` (${APP_VARIANT})` : ''}`
export const BUNDLE_ID = `ai.bubblewrap.apperitif${APP_VARIANT ? `.${APP_VARIANT}` : ''}`

export default () => {
  return {
    name: APP_NAME,
    slug: 'apperitif',
    version: '1.3.0',
    orientation: 'portrait',
    icon: './assets/images/app-icon-all.png',
    scheme: BUNDLE_ID,
    owner: 'bubblewrap',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-logo-all.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    assetBundlePatterns: ['**/*'],
    updates: {
      url: 'https://u.expo.dev/0fe189be-8677-4ba8-b1e9-c3b3e63b388f',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    ios: {
      usesAppleSignIn: true,
      supportsTablet: false,
      bundleIdentifier: BUNDLE_ID,
      config: {
        usesNonExemptEncryption: false,
      },
      associatedDomains: ['applinks:bubblewrap.ai'],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon-android-adaptive-foreground.png',
        backgroundImage: './assets/images/app-icon-android-adaptive-background.png',
      },
      package: BUNDLE_ID,
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: '*.bubblewrap.ai',
              pathPrefix: '/records',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/app-icon-web-favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-apple-authentication',
      'expo-localization',
      'sentry-expo',
      [
        'expo-updates',
        {
          username: 'bubblewrap',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '0fe189be-8677-4ba8-b1e9-c3b3e63b388f',
      },
    },
    // [APP_VARIANT === 'development' ? undefined : 'hooks']: {
    //   postPublish: [
    //     {
    //       file: 'sentry-expo/upload-sourcemaps',
    //       config: {
    //         organization: process.env.SENTRY_ORG,
    //         project: process.env.SENTRY_PROJECT,
    //       },
    //     },
    //   ],
    // },
  }
}
