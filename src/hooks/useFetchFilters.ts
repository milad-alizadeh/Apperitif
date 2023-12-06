import { ApolloError, useQuery } from '@apollo/client'
import values from 'lodash/values'
import { GetFiltersQuery } from '~/__generated__/graphql'
import { SectionHeaderType } from '~/components/SectionList'
import { GET_CONTENT } from '~/graphql/queries'
import { GET_FILTERS } from '~/graphql/queries/getFilters'
import { Filter } from '~/store'

export const useFetchFilters = (): {
  data: GetFiltersQuery | null
  loading: boolean
  error: ApolloError
  sectionsData: Filter[][]
  sectionsHeaders: SectionHeaderType[]
} => {
  // Fetch available category ids
  const { data: filterData, error: filterError } = useQuery(GET_CONTENT, {
    variables: { name: 'filters' },
    fetchPolicy: 'cache-and-network',
  })
  const categoryIds = filterData
    ? values(JSON.parse(filterData.appContentCollection.edges[0].node.content).filters)
    : []

  if (filterError)
    return { data: null, loading: false, error: filterError, sectionsData: [], sectionsHeaders: [] }

  // Fetch filters based on ids
  const { data, loading, error } = useQuery(GET_FILTERS, {
    variables: { ids: categoryIds },
    skip: !categoryIds.length,
  })

  const sectionsData: Filter[][] = data?.categoriesCollection?.edges.map((edge) => {
    return edge.node.categoriesCollection.edges.map((edge) => edge.node)
  })

  const sectionsHeaders: SectionHeaderType[] = data?.categoriesCollection?.edges.map(
    ({ node: { id, name, categoriesCollection } }) => {
      return {
        id,
        title: name,
        count: categoriesCollection.edges.length,
      }
    },
  )

  return { data, loading, error, sectionsData, sectionsHeaders }
}
