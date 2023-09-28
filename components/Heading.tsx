import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Text } from '~/components/Text'
import { SkeletonView } from '~/components/SkeletonView'

export interface HeadingProps {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  loading?: boolean
  children?: React.ReactNode
}

/**
 * Describe your component here
 */
export const Heading = observer(function Heading({ h1, h2, h3, loading, children }: HeadingProps) {
  return (
    <SkeletonView width={120} visible={!loading}>
      <Text h1={h1} h2={h2} h3={h3} styleClassName="mb-4">
        {children}
      </Text>
    </SkeletonView>
  )
})
