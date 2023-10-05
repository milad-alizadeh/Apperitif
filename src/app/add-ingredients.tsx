import { useMutation, useQuery } from '@apollo/client'
import { router } from 'expo-router'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { FixedHeader, IngredientListItem, Screen, SectionList } from '~/components'
import { ADD_TO_MY_BAR } from '~/graphql/mutations/addToMyBar'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { useIngredients } from '~/hooks/useIngredients'
import { useSession } from '~/hooks/useSession'

export default function AddIngredientsScreen() {
  const {
    initialSelectedItems,
    searchQuery,
    searchResults,
    sectionsData,
    sectionsHeader,
    selectedItems,
    setSearchQuery,
    setSelectedItems,
    setInitialSelectedItems,
  } = useIngredients()

  const [loading, setLoading] = useState(false)
  const { user } = useSession()
  const [addToMyBar, { error: addError }] = useMutation(ADD_TO_MY_BAR)
  const [deleteFromMyBar, { error: deleteError }] = useMutation(DELETE_FROM_MY_BAR)
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
