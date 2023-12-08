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
  InfoBox,
  IngredientDetails,
  Markdown,
  RecipeFavourite,
  RecipeTabs,
  Text,
} from '~/components'
import { RecipeAttributes } from '~/components/RecipeAttributes'
import { RecipeShare } from '~/components/RecipeShare'
import { ADD_TO_FAVOURITES, DELETE_FROM_FAVOURITES } from '~/graphql/mutations'
import { GET_MY_BAR, GET_RECIPE_DETAILS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useSession } from '~/hooks/useSession'
import { useStore } from '~/providers'
import { shadowLarge } from '~/theme/shadows'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'

export default function RecipeDetailsScreen() {
  const { capture } = useAnalytics()
  const bottomOffset = useSafeAreaInsetsStyle(['bottom'])
  const [ingredientId, setIngredientId] = useState<string>('')
  const [equipmentId, setEquipmentId] = useState<string>('')
  const modalRef = useRef<BottomSheetRef>(null)
  const aref = useAnimatedRef<Animated.ScrollView>()
  const scrollY = useScrollViewOffset(aref)
  const { user, isLoggedIn } = useSession()
  const client = useApolloClient()
  const { recipeId, recipeName } = useLocalSearchParams()
  const { appContent } = useStore()

  const headerHeight = useWindowDimensions().width
  const fixedHeaderOffset = headerHeight - 110

  const { data, error, loading, refetch } = useQuery(GET_RECIPE_DETAILS, {
    variables: { recipeId },
    fetchPolicy: 'cache-and-network',
  })

  const { data: barIngredients } = useQuery(GET_MY_BAR)

  const firstTimeLoading = loading && !data && !error

  const recipe = data?.recipesCollection?.edges[0]?.node
  const isFavourite = recipe?.profilesRecipesCollection.edges.length > 0

  const equipment = recipe?.recipesEquipmentCollection?.edges.map((e) => e.node.equipment) ?? []
  const recipeIngredients = recipe?.recipesIngredientsCollection?.edges?.map((e) => e.node) ?? []
  const steps = recipe?.stepsCollection?.edges.map((e) => e.node) ?? []
  const categories = recipe?.recipesCategoriesCollection?.edges.map((e) => e.node.category) ?? []
  const attributeCategories = appContent?.recipe_attributes?.categoryIds ?? []
  const attributes =
    attributeCategories.map((id: string) => categories.find((c) => c.parentId === id) ?? { id }) ??
    []

  const myBar =
    barIngredients?.profilesIngredientsCollection.edges.map((e) => e.node.ingredient.id) ?? []

  const mergedRecipeIngredients = recipeIngredients.map((recipeIngredient) => {
    const inMyBar = myBar.includes(recipeIngredient.ingredient.id)
    return {
      ...recipeIngredient,
      inMyBar,
    }
  })

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
      capture('recipe:favourite_add', { recipe_name: recipeName })
      refetch()
      client.refetchQueries({ include: ['getFavourites'] })
    },
  })

  const [deleteFromFavourites] = useMutation(DELETE_FROM_FAVOURITES, {
    variables: { recipeId: recipe?.id, profileId: user?.id },
    onError: () => {
      refetch()
    },
    onCompleted: () => {
      capture('recipe:favourite_remove', { recipe_name: recipeName })
      refetch()
      client.refetchQueries({ include: ['getFavourites'] })
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
              isFavourite={isFavourite}
            />
          )
        }
      />

      {/* Ingredient Modal */}
      <BottomSheet ref={modalRef}>
        {ingredientId && (
          <IngredientDetails onClosed={modalRef.current.hide} ingredientId={ingredientId} />
        )}
        {equipmentId && <EquipmentDetails equipmentId={equipmentId} />}
      </BottomSheet>

      <Animated.ScrollView style={bottomOffset} ref={aref} scrollEventThrottle={16}>
        <BouncyImage height={headerHeight} scrollY={scrollY} imageUrl={recipe?.imageUrl} />

        <View className="flex-1 -mt-16 py-8 bg-white rounded-t-[50px] px-6">
          {error && <InfoBox type="error" description={error?.message} />}

          <View>
            <View className="justify-between flex-row">
              <Text
                testID="recipe-name"
                loading={firstTimeLoading}
                skeletonWidth={200}
                h1
                styleClassName="mb-3"
              >
                {recipe?.name}
              </Text>
              <RecipeShare recipe={recipe} loading={firstTimeLoading} />
            </View>
            <View className="-mb-3">
              <Markdown
                testID="recipe-description"
                loading={firstTimeLoading}
                skeletonLinesNumber={4}
                text={recipe?.description}
              />
            </View>
            <View className="py-6">
              <RecipeAttributes loading={firstTimeLoading} attributes={attributes} />
            </View>
          </View>

          <View className="bg-white rounded-2xl" style={shadowLarge}>
            <RecipeTabs
              loading={firstTimeLoading}
              steps={steps}
              ingredients={mergedRecipeIngredients}
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
