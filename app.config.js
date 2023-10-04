const APP_VARIANT = process.env.APP_VARIANT
const IS_DEV = process.env.NODE_ENV === 'development'

export default {
  expo: {
    name: `Apperitif${APP_VARIANT ? ` ${APP_VARIANT}` : ''}`,
    slug: `apperitif${APP_VARIANT ? `-${APP_VARIANT}` : ''}`,
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/app-icon-all.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-logo-all.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      usesAppleSignIn: true,
      supportsTablet: false,
      googleServicesFile: './GoogleService-Info.plist',
      bundleIdentifier: APP_VARIANT
        ? `ai.bubblewrap.apperitif.${APP_VARIANT}`
        : 'ai.bubblewrap.apperitif',
      config: {
        usesNonExemptEncryption: true,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon-android-adaptive-foreground.png',
        backgroundImage: './assets/images/app-icon-android-adaptive-background.png',
      },
      googleServicesFile: './google-services.json',
      package: APP_VARIANT ? `ai.bubblewrap.apperitif.${APP_VARIANT}` : 'ai.bubblewrap.apperitif',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/app-icon-web-favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-apple-authentication',
      '@react-native-google-signin/google-signin',
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
  },
}
