import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GetIngredientsByCategoriesQuery, GetMyBarQuery } from '~/__generated__/graphql'
import { SectionDataType, SectionHeaderType } from '~/components'
import { GET_MY_BAR } from '~/graphql/queries'
import { GET_INGREDIENTS_BY_CATEGORIES } from '~/graphql/queries/getIngtedientsByCategories'
import { api } from '../services/api'

export function useIngredients() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{
    sectionsData: SectionDataType[][]
    sectionsHeader: SectionHeaderType[]
  }>()
  const [searchInitiated, setSearchInitiated] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [sectionsData, setSectionsData] = useState<SectionDataType[][]>([])
  const [sectionsHeader, setSectionsHeader] = useState<SectionHeaderType[]>([])
  const [initialSelectedItems, setInitialSelectedItems] = useState<Record<string, boolean>>({})

  /**
   * Search for ingredients that match the given search query.
   * @param searchQuery - The search query to match against ingredient names.
   */
  const searchIngredients = async (searchQuery: string) => {
    const { data } = await api.supabase.rpc('search_ingredients', {
      search_term: searchQuery,
    })

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

  const { data: categories } = useQuery(GET_INGREDIENTS_BY_CATEGORIES)
  const { data: selectedIngredients } = useQuery(GET_MY_BAR)

  /**
   * Fetches ingredients data and updates the state with the fetched data.
   * @param categories - The categories of ingredients to fetch.
   * @param selectedIngredients - The selected ingredients to fetch.
   */
  const fetchIngredients = (
    categories: GetIngredientsByCategoriesQuery,
    selectedIngredients: GetMyBarQuery,
  ) => {
    const sectionsData: SectionDataType[][] = []
    const sectionsHeader: SectionHeaderType[] = []
    const initialSelectedItems: Record<string, boolean> = {}

    categories.ingredientsByCategoriesCollection.edges.forEach(
      ({ node: { title, id, data, count } }) => {
        sectionsData.push(JSON.parse(data))
        sectionsHeader.push({ id, title, count })
      },
    )

    selectedIngredients.profilesIngredientsCollection.edges.forEach(
      ({
        node: {
          ingredient: { id },
        },
      }) => {
        initialSelectedItems[id] = true
      },
    )

    return {
      sectionsData,
      sectionsHeader,
      initialSelectedItems,
    }
  }

  useEffect(() => {
    if (!categories) return

    const { sectionsData, sectionsHeader, initialSelectedItems } = fetchIngredients(
      categories,
      selectedIngredients,
    )

    setSectionsData(sectionsData)
    setSectionsHeader(sectionsHeader)
    setInitialSelectedItems(initialSelectedItems)
    setSelectedItems(initialSelectedItems)
  }, [categories])

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
    setSearchInitiated,
  }
}
