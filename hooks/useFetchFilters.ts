import { ApolloError, useQuery } from '@apollo/client'
import values from 'lodash/values'
import { GetFiltersQuery } from '~/__generated__/graphql'
import { GET_CONTENT } from '~/graphql/queries'
import { GET_FILTERS } from '~/graphql/queries/getFilters'

export const useFetchFilters = (): {
  data: GetFiltersQuery | null
  loading: boolean
  error: ApolloError
} => {
  // Fetch available category ids
  const { data: filterData, error: filterError } = useQuery(GET_CONTENT, {
    variables: { name: 'filters' },
    fetchPolicy: 'cache-and-network',
  })
  const categoryIds = filterData
    ? values(JSON.parse(filterData.contentApperitivoCollection.edges[0].node.content).filters)
    : []

  if (filterError) return { data: null, loading: false, error: filterError }

  // Fetch filters based on ids
  const { data, loading, error } = useQuery(GET_FILTERS, {
    variables: { ids: categoryIds },
    skip: !categoryIds.length,
  })

  return { data, loading, error }
}
