import * as Sentry from 'sentry-expo'

export const captureError = (error: Error | string) => {
  if (typeof error === 'string') {
    error = new Error(error)
  }

  if (__DEV__) console.log('captureError', error)
  Sentry.Native.captureException(error)
}
