import * as StoreReview from 'expo-store-review'
import { useEffect } from 'react'
import { useAnalytics } from './useAnalytics'

// https://docs.expo.dev/versions/latest/sdk/storereview

export const useAppReview = () => {
  const { capture } = useAnalytics()

  useEffect(() => {
    const requestReview = async () => {
      if (await StoreReview.hasAction()) {
        StoreReview.requestReview()
      }
    }

    requestReview()
  }, [capture])
}
