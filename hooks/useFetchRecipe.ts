import humps from 'lodash-humps'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useStores } from '../models'
import { api } from '../services/api'

/**
 * Custom hook to fetch recipes based on the provided category ID.
 * @param {string} initialCategoryId - The initial category ID to fetch recipes for.
 * @returns {Object} - Contains recipes, pageInfo, loading state, error, refreshing state, and functions for manual refresh and loading more recipes.
 */
export const useFetchRecipes = (initialCategoryId: string) => {
  const { recipeStore } = useStores()

  const [recipes, setRecipes] = useState([])
  const [pageInfo, setPageInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 20

  // On mount, clear any existing filters and set the initial category filter
  useEffect(() => {
    recipeStore.clearFilters()
    if (initialCategoryId) {
      recipeStore.addFilter(initialCategoryId)
    }
  }, [])

  // Function to fetch recipes. Uses useCallback to memoize and prevent unnecessary re-renders.
  const fetchRecipes = useCallback(
    async (pageNum = pageNumber, mergeResults = false) => {
      setLoading(true)

      // Make the API call
      const { data, error } = await api.supabase.rpc('get_recipes_by_category_ids', {
        search_term: recipeStore.searchQuery,
        category_ids: recipeStore.selectedFilters,
        page_size: pageSize,
        page_number: pageNum,
      })

      // Convert snake_case keys to camelCase
      const { hasNextPage, totalCount, recipes: fetchedRecipes } = humps(data)

      setError(error)
      setLoading(false)
      setPageInfo({ hasNextPage, totalCount })

      // Merge results if required, else set new results
      if (mergeResults) {
        setRecipes((prev) => [...prev, ...fetchedRecipes])
      } else {
        setRecipes(fetchedRecipes)
      }
    },
    [recipeStore, pageNumber],
  )

  // Create a debounced version of fetchRecipes for the search query
  const debouncedFetchRecipes = useRef(debounce(fetchRecipes, 200)).current

  useEffect(() => {
    if (recipeStore.searchQuery.length > 2 || recipeStore.searchQuery.length === 0) {
      debouncedFetchRecipes()
    }
  }, [recipeStore.searchQuery])

  // Fetch recipes whenever search query, selected filters, or page number changes
  useEffect(() => {
    // Only fetch recipes if it's the initial load or due to search/filter changes
    if (pageNumber === 1 || recipeStore.selectedFilters.length) {
      fetchRecipes() // Do not merge on initial load or search/filter changes
    }
  }, [recipeStore.selectedFilters.join(',')])

  // Function to manually refresh the recipes list
  const manualRefresh = async () => {
    setPageNumber(() => {
      const newPageNumber = 1
      setRefreshing(true)
      fetchRecipes(newPageNumber).then(() => setRefreshing(false))
      return newPageNumber
    })
  }

  // Function to load more recipes when user reaches the end of the list
  const loadMore = () => {
    if (pageInfo?.hasNextPage) {
      setPageNumber((prevPageNumber) => {
        const newPageNumber = prevPageNumber + 1
        fetchRecipes(newPageNumber, true)
        return newPageNumber
      })
    }
  }

  return { recipes, pageInfo, loading, error, refreshing, manualRefresh, loadMore }
}
