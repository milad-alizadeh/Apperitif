import { PixelRatio } from 'react-native'

export enum imageSizes {
  MEDIUM = 'medium',
  THUMBNAIL = 'thumbnail',
  DEFAULT = '',
}

export const getImageUrl = (url: string, size: imageSizes): string => {
  if (!url || url.includes('@')) return url

  const pixelRatio = PixelRatio.get()
  let densitySuffix = ''

  if (pixelRatio >= 3) {
    densitySuffix = '@3x'
  } else if (pixelRatio >= 2) {
    densitySuffix = '@2x'
  }

  // Remove any query parameters from the URL
  const baseUrl = url.split('?')[0]

  if (size === imageSizes.DEFAULT) return `${baseUrl}${densitySuffix}`
  if (size === imageSizes.MEDIUM) densitySuffix = '@2x'

  const parts = baseUrl.split('.')
  const extension = parts.pop()
  console.log('parts', `${parts.join('.')}-${size}${densitySuffix}.${extension}`)
  return `${parts.join('.')}-${size}${densitySuffix}.${extension}`
}
