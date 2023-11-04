import * as Sentry from 'sentry-expo'

export const useSentry = () => {
  if (!process.env.EXPO_PUBLIC_SENTRY_DSN) return
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: process.env.NODE_ENV === 'development',
  })
}
