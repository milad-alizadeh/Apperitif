import { useMutation } from '@apollo/client'
import { router } from 'expo-router'
import debounce from 'lodash/debounce'
import React, { useCallback, useRef, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { FixedHeader, IngredientListItem, Screen, SectionList } from '~/components'
import { ADD_TO_MY_BAR } from '~/graphql/mutations/addToMyBar'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useFetchIngredients } from '~/hooks/useFetchIngredients'
import { useSession } from '~/hooks/useSession'
import { useStore } from '~/providers'
import { captureError } from '~/utils/captureError'

export default function AddIngredientsScreen() {
  const { capture } = useAnalytics()
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
  } = useFetchIngredients()
  const { setCurrentIngredientId } = useStore()
  const [loading, setLoading] = useState(false)
  const { user } = useSession()
  const [addToMyBar, { error: addError }] = useMutation(ADD_TO_MY_BAR)
  const [deleteFromMyBar, { error: deleteError }] = useMutation(DELETE_FROM_MY_BAR)
  const sections = searchQuery ? searchResults : { sectionsData, sectionsHeader }
  const [ingredientId, setIngredientId] = useState<string>('')

  const handleSelect = useCallback(
    (id: string, name: string) => {
      const newSelectedItems = {
        ...selectedItems,
        [id]: {
          name,
          selected: !selectedItems[id]?.selected ?? true,
        },
      }
      setSelectedItems(newSelectedItems)
    },
    [selectedItems],
  )

  const renderItem = useCallback(
    ({ item }) => {
      if (!item.name) return <View className="w-full h-64 bg-white" />
      const isChecked = !!selectedItems[item.id]?.selected
      console.log(isChecked, 'isChecked', selectedItems[item.id])
      return (
        <View className="px-6 py-2 bg-white">
          <IngredientListItem
            name={item.name}
            testID="ingredient-list-item"
            checked={isChecked}
            onPress={() => {
              handleSelect(item.id, item.name)
            }}
            onInfoPress={() => {
              capture('add_ingredients:ingredient_details_press', { ingredient_name: item.name })
              setCurrentIngredientId(item.id)
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

    for (const id in selectedItems) {
      if (selectedItems[id].selected && !initialSelectedItems[id]?.selected) {
        // Item is present in selectedItems but not in initialSelectedItems, so it's added
        addedItems.push({ id, ...selectedItems[id] })
      } else if (!selectedItems[id].selected && !!initialSelectedItems[id]?.selected) {
        // Item is not present in selectedItems but is in initialSelectedItems, so it's deleted
        deletedItems.push({ id, ...selectedItems[id] })
      }
    }

    if (addedItems.length > 0) {
      await addToMyBar({
        variables: {
          records: addedItems.map(({ id }) => ({ ingredientId: id, profileId: user?.id })),
        },
      })

      for (const item of addedItems) {
        capture('add_ingredients:ingredient_add', { ingredient_name: item.name })
      }
    }

    if (deletedItems.length > 0) {
      await deleteFromMyBar({
        variables: {
          ingredientIds: deletedItems.map(({ id }) => id),
          profileIds: user?.id,
        },
      })

      for (const item of deletedItems) {
        capture('add_ingredients:ingredient_remove', { ingredient_name: item.name })
      }
    }

    if (addError || deleteError) {
      captureError(addError || deleteError)
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
          onSearch={debounce(setSearchQuery, 500)}
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
