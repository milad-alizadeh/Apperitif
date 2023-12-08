import { useQuery } from '@apollo/client'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import React, { FC, createContext, useContext } from 'react'
import { GET_CONTENT } from '~/graphql/queries'
import { captureError } from '~/utils/captureError'

const AppContentContext = createContext<Record<string, any>>(undefined)

export const AppContentProvider: FC<{ children: any }> = ({ children }) => {
  const { data, error } = useQuery(GET_CONTENT, {
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    captureError(error.message)
  }

  const appContent = mapValues(keyBy(data?.appContentCollection?.edges ?? [], 'node.name'), (e) =>
    JSON.parse(e.node.content),
  )

  return <AppContentContext.Provider value={appContent}>{children}</AppContentContext.Provider>
}

export const useAppContent = () => {
  const context = useContext(AppContentContext)
  if (!context) {
    throw new Error('useAppContent must be used within a AppContentProvider')
  }
  return context
}
