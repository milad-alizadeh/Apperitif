import { ApolloError, useQuery, useReactiveVar } from '@apollo/client'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import values from 'lodash/values'
import { useEffect, useState } from 'react'
import { GetFiltersQuery } from '~/__generated__/graphql'
import { SectionHeaderType } from '~/components/SectionList'
import { GET_CONTENT } from '~/graphql/queries'
import { GET_FILTERS } from '~/graphql/queries/getFilters'
import { api } from '~/services'
import { Filter, draftSelectedFiltersVar } from '~/store'
import { captureError } from '~/utils/captureError'

export const useFetchFilters = (): {
  data: GetFiltersQuery | null
  loading: boolean
  error: ApolloError
  sectionsData: Filter[][]
  sectionsHeaders: SectionHeaderType[]
  resultCount: number
  getResultCount: () => Promise<void>
} => {
  // Fetch available category ids
  const draftSelectedFilters = useReactiveVar(draftSelectedFiltersVar)
  const { data: filterData, error: filterError } = useQuery(GET_CONTENT, {
    variables: { name: 'filters' },
    fetchPolicy: 'cache-and-network',
  })
  const categoryIds = filterData
    ? values(JSON.parse(filterData.appContentCollection.edges[0].node.content).filters)
    : []

  if (filterError)
    return {
      data: null,
      loading: false,
      error: filterError,
      sectionsData: [],
      sectionsHeaders: [],
      resultCount: 0,
      getResultCount: () => Promise.resolve(),
    }

  // Fetch filters based on ids
  const { data, loading, error } = useQuery(GET_FILTERS, {
    variables: { ids: categoryIds },
    skip: !categoryIds.length,
  })

  const sectionsData: Filter[][] = data?.categoriesCollection?.edges.map((edge) => {
    return edge.node.categoriesCollection.edges.map((edge) => edge.node)
  })

  const sectionsHeaders: SectionHeaderType[] = data?.categoriesCollection?.edges.map(
    ({ node: { id, name } }) => {
      return {
        id,
        title: name,
        count: 1,
      }
    },
  )

  const [resultCount, setResultCount] = useState(0)

  const getResultCount = async () => {
    const groupedCategories = groupBy(draftSelectedFilters, 'parentId')
    const category_groups = map(groupedCategories, (value, key) => map(value, 'id'))
    const { data, error } = await api.supabase.rpc('get_recipes_by_category_ids', {
      search_term: '',
      category_groups,
      page_size: 0,
      page_number: 0,
      count_only: true,
    })

    if (error) {
      captureError(error.message)
    } else {
      setResultCount(data.total_count)
    }
  }

  return { data, loading, error, sectionsData, sectionsHeaders, resultCount, getResultCount }
}
