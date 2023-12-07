import * as Sentry from 'sentry-expo'
import { SENTRY_DSN } from '~/config'

export const useSentry = () => {
  if (!SENTRY_DSN) return
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: process.env.NODE_ENV === 'development',
    integrations: [new Sentry.Native.ReactNativeTracing()],
  })
}
