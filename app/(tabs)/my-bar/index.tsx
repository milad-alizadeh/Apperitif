import { useMutation, useQuery } from '@apollo/client'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import {
  BottomSheet,
  BottomSheetRef,
  Button,
  Header,
  HorizontalList,
  IngredientDetails,
  ListItem,
  Screen,
  SectionDataType,
  SectionHeaderType,
  SectionList,
  Text,
} from '~/components'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { GET_MY_BAR } from '~/graphql/queries/getMyBar'
import { useSession } from '~/hooks/useSession'

export default function MyBarHomeScreen() {
  const { user } = useSession()
  const [ingredientId, setIngredientId] = useState<string>('')
  const modalRef = useRef<BottomSheetRef>(null)

  const { data, refetch } = useQuery(GET_MY_BAR, {
    fetchPolicy: 'network-only',
  })

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      // Refetch the data when the tab gains focus
      refetch()
    }
  }, [isFocused, refetch])

  const ingredientsInBar = data?.profilesIngredientsCollection.edges.map((e) => ({
    name: e.node.ingredient.name,
    id: e.node.ingredient.id,
    category: e.node.ingredient.ingredientsCategoriesCollection.edges[0].node.category?.name,
  }))

  let sectionsData: SectionDataType[][] = []
  let sectionsHeader: SectionHeaderType[] = []

  const categoriesdIngredients =
    ingredientsInBar?.reduce((acc, item) => {
      const existingSection = acc.find((section) => section.title === item.category)
      if (existingSection) {
        existingSection.data.push(item)
        existingSection.count += 1
      } else {
        acc.push({
          title: item.category,
          data: [item],
          count: 1,
        })
      }
      return acc
    }, []) ?? []

  sectionsData = categoriesdIngredients.map((section) => section.data)
  sectionsHeader = categoriesdIngredients.map((section) => ({
    title: section.title,
    count: section.count,
    id: section.title,
  }))

  const [deleteFromMyBar] = useMutation(DELETE_FROM_MY_BAR)

  const handleIngredientPress = useCallback((ingredientId: string) => {
    setIngredientId(ingredientId)
    modalRef.current.show()
  }, [])

  const renderItem = useCallback(
    ({ item }) => {
      if (!item.name) return <View className="w-full h-64 bg-white p-page-spacing" />
      return (
        <ListItem
          leftImage={item.imageUrl}
          rightIcon="trash"
          name={item.name}
          styleClassName="mx-6"
          card
          onPress={() => handleIngredientPress(item.id)}
          onRightIconPress={() => {
            deleteFromMyBar({
              variables: { ingredientIds: [item.id], profileIds: [user?.id] },
              onCompleted: () => {
                refetch()
              },
            })
          }}
        />
      )
    },
    [sectionsData],
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={['top']}>
      <Header
        title="My Bar"
        rightElement={
          <Button label="Add Ingredients" onPress={() => router.push('/add-ingredients')} />
        }
      />

      {/* Empty state if there are no recipes in the bar */}
      {data && !data?.profilesIngredientsCollection.edges.length && (
        <View className="w-full flex-1 justify-center items-center m-auto">
          <Text h3 styleClassName="text-center max-w-[220px] mb-3">
            Uh-oh, your bar is drier than a Martini!
          </Text>
          <Text styleClassName="text-center" body>
            Add some ingredients to get shaking.
          </Text>
        </View>
      )}

      {/* List of ingredients in the bar */}
      {data && !!data?.profilesIngredientsCollection.edges.length && (
        <SectionList
          sectionsData={sectionsData}
          sectionsHeader={sectionsHeader}
          renderItem={renderItem}
          headerHeight={128}
          listHeaderComponent={
            <HorizontalList
              styleClassName="mt-4"
              title="Recipes I can make"
              listItems={[]}
              emptyStateText="Add more ingredients to get recipe suggestions."
            />
          }
        />
      )}

      {/* Ingredient details Modal */}
      <BottomSheet ref={modalRef}>
        <IngredientDetails ingredientId={ingredientId} />
      </BottomSheet>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
