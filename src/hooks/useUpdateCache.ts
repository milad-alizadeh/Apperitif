import { DocumentNode, useApolloClient } from '@apollo/client'

export const useUpdateCache = () => {
  const client = useApolloClient()

  const updateCache = (query: DocumentNode, data: Record<string, any>) => {
    client.writeQuery({
      query: query,
      data: data,
    })
  }

  return updateCache
}
