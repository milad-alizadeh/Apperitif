import { useMutation, useQuery } from '@apollo/client'
import { router } from 'expo-router'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import {
  FixedHeader,
  IngredientListItem,
  Screen,
  SectionDataType,
  SectionHeaderType,
  SectionList,
  Text,
} from '~/components'
import { ADD_TO_MY_BAR } from '~/graphql/mutations/addToMyBar'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { GET_INGREDIENTS_CATEGORIES } from '~/graphql/queries/getIngtedientsCategories'
import { useSession } from '~/hooks/useSession'
import { api } from '~/services/api'

export default function AddIngredientsScreen() {
  const [loading, setLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{
    sectionsData: SectionDataType[][]
    sectionsHeader: SectionHeaderType[]
  }>()
  const [sectionsData, setSectionsData] = useState<SectionDataType[][]>([])
  const [sectionsHeader, setSectionsHeader] = useState<SectionHeaderType[]>([])
  const [initialSelectedItems, setInitialSelectedItems] = useState<Record<string, boolean>>({})
  const { user } = useSession()

  const [addToMyBar, { error: addError }] = useMutation(ADD_TO_MY_BAR)
  const [deleteFromMyBar, { error: deleteError }] = useMutation(DELETE_FROM_MY_BAR)

  const { data } = useQuery(GET_INGREDIENTS_CATEGORIES, {
    fetchPolicy: 'network-only',
  })

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

  useEffect(() => {
    searchIngredients(searchQuery)
  }, [searchQuery])

  const sections = searchQuery ? searchResults : { sectionsData, sectionsHeader }

  const handleSelect = useCallback((itemId: string) => {
    setSelectedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
  }, [])

  const renderItem = useCallback(
    ({ item }) => {
      if (!item.name) return <View className="w-full h-64 bg-white" />
      const isChecked = !!selectedItems[item.id]
      return (
        <View className="px-6 py-2 bg-white">
          <IngredientListItem
            name={item.name}
            checked={isChecked}
            onPress={() => {
              handleSelect(item.id)
            }}
          />
        </View>
      )
    },
    [handleSelect, selectedItems],
  )

  const onSave = async () => {
    setLoading(true) // Set loading to true when onSave is triggered

    const addedItems = []
    const deletedItems = []

    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[key] && !initialSelectedItems[key]) {
        // Item is present in selectedItems but not in initialSelectedItems, so it's added
        addedItems.push(key)
      } else if (!selectedItems[key] && initialSelectedItems[key]) {
        // Item is not present in selectedItems but is in initialSelectedItems, so it's deleted
        deletedItems.push(key)
      }
    })

    if (addedItems.length > 0) {
      await addToMyBar({
        variables: {
          records: addedItems.map((id) => ({ ingredientId: id, profileId: user?.id })),
        },
      })
    }

    if (deletedItems.length > 0) {
      await deleteFromMyBar({
        variables: {
          ingredientIds: deletedItems,
          profileIds: deletedItems.map(() => user?.id),
        },
      })
    }

    if (addError || deleteError) {
      console.error('Add Error:', addError, 'Delete Error:', deleteError)
      setLoading(false) // Set loading to false if an error occurs
      return // Exit the function if an error occurs
    }

    // If no errors occurred during the mutations, update the state and navigate
    setInitialSelectedItems(selectedItems)
    router.push('/my-bar')
    setLoading(false) // Set loading to false after all operations are complete
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={$container}>
      <FixedHeader
        title="Add Ingredients"
        onGoBack={() => router.back()}
        showShadow={false}
        offset={0}
      />

      {!!sections?.sectionsData.length && (
        <SectionList
          sectionsData={sections.sectionsData}
          sectionsHeader={sections.sectionsHeader}
          selectedItems={selectedItems}
          searchQuery={searchQuery}
          showHeader
          loading={loading}
          onSearch={(value) => {
            setSearchQuery(value)
          }}
          renderItem={renderItem}
          onSave={onSave}
        />
      )}
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
