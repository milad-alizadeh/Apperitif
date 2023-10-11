import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useRef, useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'
import {
  BottomSheet,
  BottomSheetRef,
  BouncyImage,
  EquipmentDetails,
  FixedHeader,
  IngredientDetails,
  Markdown,
  RecipeFavourite,
  RecipeTabs,
  Text,
} from '~/components'
import { RecipeAttributes } from '~/components/RecipeAttributes'
import { ADD_TO_FAVOURITES, DELETE_FROM_FAVOURITES } from '~/graphql/mutations'
import { GET_CONTENT, GET_FAVOURITES, GET_RECIPE_DETAILS } from '~/graphql/queries'
import { useSession } from '~/hooks/useSession'
import { shadowLarge } from '~/theme/shadows'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'

export default function RecipeDetailsScreen() {
  const bottomOffset = useSafeAreaInsetsStyle(['bottom'])
  const [ingredientId, setIngredientId] = useState<string>('')
  const [equipmentId, setEquipmentId] = useState<string>('')
  const modalRef = useRef<BottomSheetRef>(null)
  const aref = useAnimatedRef<Animated.ScrollView>()
  const scrollY = useScrollViewOffset(aref)
  const { user, isLoggedIn } = useSession()
  const client = useApolloClient()
  const { recipeId } = useLocalSearchParams()

  const headerHeight = useWindowDimensions().width
  const fixedHeaderOffset = headerHeight - 110

  const { data, error, loading, refetch } = useQuery(GET_RECIPE_DETAILS, {
    variables: { recipeId },
  })

  const { data: attributesData } = useQuery(GET_CONTENT, {
    variables: {
      name: 'recipe_attributes',
    },
    fetchPolicy: 'cache-and-network',
  })

  const recipe = data?.recipesCollection?.edges[0]?.node
  const equipment = recipe?.recipesEquipmentCollection?.edges.map((e) => e.node.equipment) ?? []
  const ingredients = recipe?.recipesIngredientsCollection?.edges?.map((e) => e.node) ?? []
  const steps = recipe?.stepsCollection?.edges.map((e) => e.node) ?? []
  const categories = recipe?.recipesCategoriesCollection?.edges.map((e) => e.node.category) ?? []
  const attributeCategories = attributesData?.appContentCollection?.edges?.[0]?.node?.content
  const attributeCategoriesParsed = attributeCategories
    ? JSON.parse(attributeCategories)?.categoryIds
    : []
  const attributes = attributeCategoriesParsed.map((id: string) =>
    categories.find((c) => c.parentId === id),
  )

  const onIngredientPress = useCallback((id) => {
    setIngredientId(id)
    setEquipmentId(null)
    modalRef.current.show()
  }, [])

  const onEquipmentPress = useCallback((id) => {
    setEquipmentId(id)
    setIngredientId(null)
    modalRef.current.show()
  }, [])

  const [addToFavourites] = useMutation(ADD_TO_FAVOURITES, {
    variables: { recipeId: recipe?.id, profileId: user?.id },
    onError: () => {
      refetch()
    },
    onCompleted: () => {
      client.refetchQueries({
        include: [GET_FAVOURITES], // The name of the query you want to refetch
      })
    },
  })

  const [deleteFromFavourites] = useMutation(DELETE_FROM_FAVOURITES, {
    variables: { recipeId: recipe?.id, profileId: user?.id },
    onError: () => {
      refetch()
    },
    onCompleted: () => {
      client.refetchQueries({
        include: [GET_FAVOURITES], // The name of the query you want to refetch
      })
    },
  })

  return (
    <View className="flex bg-white flex-1">
      {/* Fixed Header */}
      <FixedHeader
        scrollY={scrollY}
        offset={fixedHeaderOffset}
        title={recipe?.name}
        onGoBack={() => router.back()}
        showTopInset
        rightElement={
          recipe &&
          isLoggedIn && (
            <RecipeFavourite
              onDelete={() => deleteFromFavourites()}
              onAdd={() => addToFavourites()}
              isFavourite={recipe?.profilesRecipesCollection.edges.length > 0}
            />
          )
        }
      />

      {/* Ingredient Modal */}
      <BottomSheet ref={modalRef}>
        {ingredientId && <IngredientDetails ingredientId={ingredientId} />}
        {equipmentId && <EquipmentDetails equipmentId={equipmentId} />}
      </BottomSheet>

      <Animated.ScrollView style={bottomOffset} ref={aref} scrollEventThrottle={16}>
        <BouncyImage height={headerHeight} scrollY={scrollY} imageUrl={recipe?.imageUrl} />

        <View className="flex-1 -mt-16 py-8 bg-white rounded-t-[50px] px-6">
          <View>
            <Text h1 styleClassName="mb-3">
              {recipe?.name}
            </Text>
            <View className="-mb-3">
              <Markdown text={recipe?.description} />
            </View>
            <View className="py-6">
              <RecipeAttributes attributes={attributes} />
            </View>
          </View>

          <View className="bg-white rounded-2xl" style={shadowLarge}>
            <RecipeTabs
              steps={steps}
              ingredients={ingredients}
              equipment={equipment}
              onIngredientPress={onIngredientPress}
              onEquipmentPress={onEquipmentPress}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}
