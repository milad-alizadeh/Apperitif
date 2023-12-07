import * as Sentry from 'sentry-expo'
import { SENTRY_DSN } from '~/config'

export const initSentry = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: process.env.NODE_ENV === 'development',
    integrations: [
      new Sentry.Native.ReactNativeTracing({
        shouldCreateSpanForRequest: (url) => {
          return !__DEV__ || !url.startsWith(`http://127.0.0.1:8081/logs`)
        },
      }),
    ],
  })
}
