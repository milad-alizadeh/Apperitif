import { useQuery } from '@apollo/client'
import keyBy from 'lodash/keyBy'
import { useEffect, useState } from 'react'
import { SectionDataType, SectionHeaderType } from '~/components'
import { GET_INGREDIENTS_BY_CATEGORIES } from '~/graphql/queries/getIngtedientsByCategories'
import { useAppContent } from '~/providers'
import { captureError } from '~/utils/captureError'
import { api } from '../services/api'
import { useAnalytics } from './useAnalytics'
import { useFetchMyBar } from './useFetchMybar'

export type SelectedItems = Record<string, { name: string; selected: boolean }>

export const useFetchIngredients = () => {
  try {
    const { ingredientsInMyBar } = useFetchMyBar()
    const { capture } = useAnalytics()
    const { ingredient_categories } = useAppContent()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<{
      sectionsData: SectionDataType[][]
      sectionsHeader: SectionHeaderType[]
    }>()
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({})
    const [sectionsData, setSectionsData] = useState<SectionDataType[][]>([])
    const [sectionsHeader, setSectionsHeader] = useState<SectionHeaderType[]>([])
    const [initialSelectedItems, setInitialSelectedItems] = useState<SelectedItems>({})

    /**
     * Search for ingredients that match the given search query.
     * @param searchQuery - The search query to match against ingredient names.
     */
    const searchIngredients = async (searchQuery: string) => {
      if (!searchQuery) {
        setSearchResults({
          sectionsData: [[]],
          sectionsHeader: [{ title: 'No results', id: 'no-results-id', count: 0 }],
        })
      }

      const { data } = await api.supabase.rpc('search_ingredients', {
        search_term: searchQuery,
      })

      if (searchQuery.length > 0) {
        // Capture the search result event
        capture('browse:search_result_load', {
          search_term: searchQuery,
          character_count: searchQuery.length,
          result_count: data.length,
        })
      }

      const sectionsHeader = data.length
        ? [{ title: 'Results', id: 'results-id', count: data.length }]
        : [{ title: 'No results', id: 'no-results-id', count: 0 }]

      setSearchResults({
        sectionsData: data.length ? [data] : [[]],
        sectionsHeader,
      })
    }

    useEffect(() => {
      searchIngredients(searchQuery)
    }, [searchQuery])

    const { data: categories } = useQuery(GET_INGREDIENTS_BY_CATEGORIES, {
      fetchPolicy: 'cache-and-network',
    })

    const { data: selectedIngredients } = useQuery(GET_INGREDIENTS_IN_MY_BAR, {
      fetchPolicy: 'cache-and-network',
    })

    useEffect(() => {
      if (!categories) return
      const sectionsData: SectionDataType[][] = []
      const sectionsHeader: SectionHeaderType[] = []
      const categoriesById = keyBy(categories?.ingredientsByCategoriesCollection?.edges, 'node.id')

      ingredient_categories?.category_ids?.forEach((categoryId: string) => {
        const { id, title, data, count } = categoriesById[categoryId]?.node
        sectionsData.push(JSON.parse(data))
        sectionsHeader.push({ id, title, count })
      }) ?? []

      setSectionsData(sectionsData)
      setSectionsHeader(sectionsHeader)
    }, [categories])

    useEffect(() => {
      if (!selectedIngredients) return
      const initialSelectedItems: SelectedItems = {}
      ingredientsInMyBar.forEach(({ name, id }) => {
        initialSelectedItems[id] = {
          name,
          selected: true,
        }
      })

      setInitialSelectedItems(initialSelectedItems)
      setSelectedItems(initialSelectedItems)
    }, [selectedIngredients])

    return {
      searchQuery,
      setSearchQuery,
      searchIngredients,
      setSelectedItems,
      sectionsData,
      sectionsHeader,
      selectedItems,
      initialSelectedItems,
      searchResults,
      setInitialSelectedItems,
    }
  } catch (error) {
    captureError(error)
  }
}
