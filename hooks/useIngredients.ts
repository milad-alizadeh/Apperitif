import { useMutation, useQuery } from '@apollo/client'
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

  useEffect(() => {
    if (!data) return

    const newSectionsData: SectionDataType[][] = []
    const newSectionsHeader: SectionHeaderType[] = []
    const newInitialSelectedItems: Record<string, boolean> = {}

    data.categoriesCollection.edges
      .filter((e) => e.node.ingredientsCategoriesCollection.edges.length > 0)
      .forEach((edge) => {
        const ingredientsEdges = edge.node.ingredientsCategoriesCollection.edges
        const title = edge.node.name
        const id = edge.node.id
        const count = ingredientsEdges.length

        const data = ingredientsEdges.map((edge) => {
          const { id, name, profilesIngredientsCollection } = edge.node.ingredient
          if (profilesIngredientsCollection.edges.length > 0) {
            newInitialSelectedItems[id] = true
          }
          return { id, name }
        })

        newSectionsHeader.push({ id, title, count })
        newSectionsData.push(data)
      })

    setSectionsData(newSectionsData)
    setSectionsHeader(newSectionsHeader)
    setInitialSelectedItems(newInitialSelectedItems)
    setSelectedItems(newInitialSelectedItems)
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
