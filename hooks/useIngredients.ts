import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { SectionDataType, SectionHeaderType } from '~/components'
import { GET_INGREDIENTS_CATEGORIES } from '~/graphql/queries/getIngtedientsCategories'
import { api } from '../services/api'

export function useIngredients() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{
    sectionsData: SectionDataType[][]
    sectionsHeader: SectionHeaderType[]
  }>()

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [sectionsData, setSectionsData] = useState<SectionDataType[][]>([])
  const [sectionsHeader, setSectionsHeader] = useState<SectionHeaderType[]>([])
  const [initialSelectedItems, setInitialSelectedItems] = useState<Record<string, boolean>>({})

  // Search ingredients
  const searchIngredients = async (searchQuery: string) => {
    const { data } = await api.supabase.rpc('search_ingredients', {
      search_term: searchQuery,
    })

    const sectionsHeader = data.length
      ? [{ title: 'Results', id: 'results-id', count: data.length }]
      : [{ title: 'No results', id: 'no-results-id', count: 0 }]

    setSearchResults({
      sectionsData: data.length ? [data] : [[{ id: '', name: '' }]],
      sectionsHeader,
    })
  }

  useEffect(() => {
    searchIngredients(searchQuery)
  }, [searchQuery])

  // Get ingredients categories
  const { data } = useQuery(GET_INGREDIENTS_CATEGORIES, {
    fetchPolicy: 'network-only',
  })

  const fetchIngredients = async () => {
    const { data: categories, error } = await api.supabase
      .from('ingredients_by_categories')
      .select('*')

    const { data: mybar } = await api.supabase.from('profiles_ingredients').select('ingredient_id')
    const newSectionsData: SectionDataType[][] = []
    const newSectionsHeader: SectionHeaderType[] = []
    const newInitialSelectedItems: Record<string, boolean> = {}

    categories.forEach(({ title, id, data, count }) => {
      newSectionsData.push(data)
      newSectionsHeader.push({ id, title, count })
    })

    mybar.forEach(({ ingredient_id }) => {
      newInitialSelectedItems[ingredient_id] = true
    })

    setSectionsData(newSectionsData)
    setSectionsHeader(newSectionsHeader)
    setInitialSelectedItems(newInitialSelectedItems)
    setSelectedItems(newInitialSelectedItems)
  }

  useEffect(() => {
    if (!data) return

    fetchIngredients()
  }, [data])

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
}
