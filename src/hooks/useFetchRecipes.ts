import { useReactiveVar } from '@apollo/client'
import humps from 'lodash-humps'
import debounce from 'lodash/debounce'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import { useCallback, useEffect, useRef, useState } from 'react'
import { addFilter, clearFilters, searchQueryVar, selectedFiltersVar } from '~/store'
import { captureError } from '~/utils/captureError'
import { api } from '../services/api'
import { useAnalytics } from './useAnalytics'

/**
 * Custom hook to fetch recipes based on the provided category ID.
 * @param {string} initialCategoryId - The initial category ID to fetch recipes for.
 * @returns {Object} - Contains recipes, pageInfo, loading state, error, refreshing state, and functions for manual refresh and loading more recipes.
 */
export const useFetchRecipes = (categoryIds: string[], categgoryName: string) => {
  const { capture } = useAnalytics()
  const [recipes, setRecipes] = useState([])
  const [pageInfo, setPageInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 20
  const [isInitialSetupComplete, setIsInitialSetupComplete] = useState(false)
  const initialLoadRef = useRef(true) // Ref to track the initial load
  const searchQuery = useReactiveVar(searchQueryVar)
  const selectedFilters = useReactiveVar(selectedFiltersVar)

  // Function to fetch recipes
  const fetchRecipes = useCallback(
    async (pageNum = pageNumber, mergeResults = false) => {
      setLoading(true)
      if (!mergeResults) {
        setRecipes([])
      }
      const currentSelectedFilters = selectedFiltersVar()
      const groupedCategories = groupBy(currentSelectedFilters, 'parentId')
      const category_groups = map(groupedCategories, (value) => map(value, 'id'))

      const search_term = searchQueryVar()

      // Make the API call
      const { data, error } = await api.supabase.rpc('get_recipes_by_category_ids', {
        search_term: searchQueryVar(),
        category_groups,
        page_size: pageSize,
        page_number: pageNum,
        count_only: false,
      })

      if (error) {
        captureError(error.message)
      }
      // Convert snake_case keys to camelCase
      const { hasNextPage, totalCount, recipes } = humps(data)

      if (search_term.length > 0) {
        // Capture the search result event
        capture('browse:search_result_load', {
          search_term,
          character_count: search_term.length,
          result_count: totalCount,
        })
      }

      setError(error)
      setPageInfo({ hasNextPage, totalCount })

      // Merge results if required, else set new results
      const fetchedRecipes = recipes ?? []
      if (mergeResults) {
        setRecipes((prev) => [...prev, ...fetchedRecipes])
      } else {
        setRecipes(fetchedRecipes)
      }

      setLoading(false)
    },
    [searchQuery, selectedFiltersVar().join(','), pageNumber],
  )

  // Create a debounced version of fetchRecipes for the search query
  const debouncedFetchRecipes = useRef(debounce(fetchRecipes, 500)).current

  // On mount, clear any existing filters and set the initial category filter
  useEffect(() => {
    clearFilters(false)
    setIsInitialSetupComplete(true) // Set isInitialSetupComplete to true after setting the initial filter
    const id = Array.isArray(categoryIds) ? categoryIds[0] : categoryIds
    if (!id) return
    addFilter({ id, name: categgoryName, parentId: '1' }, false)
  }, [])

  // Call fetchRecipes once the initial setup is complete
  useEffect(() => {
    if (isInitialSetupComplete) {
      fetchRecipes().then(() => {
        initialLoadRef.current = false // Set initialLoadRef to false after the initial load
      })
    }
  }, [isInitialSetupComplete])

  // Handle changes in search query and selected filters after the initial load
  useEffect(() => {
    if (!initialLoadRef.current && isInitialSetupComplete) {
      // If it's not the initial load and initial setup is complete,
      // call fetchRecipes on search query or filter changes
      if (searchQuery.length > 0) {
        debouncedFetchRecipes()
      } else {
        fetchRecipes()
      }
    }
  }, [searchQuery, selectedFilters.join(','), isInitialSetupComplete])

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
