import * as Sentry from 'sentry-expo'
import { SENTRY_DSN } from '~/config'
import { APP_VARIANT } from '~/config'

export const initSentry = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: process.env.NODE_ENV === 'development',
    integrations: [
      new Sentry.Native.ReactNativeTracing({
        shouldCreateSpanForRequest: (url) => {
          return APP_VARIANT !== 'development'
        },
      }),
    ],
  })
}
