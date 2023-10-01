import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { router, useLocalSearchParams } from 'expo-router'
import { set } from 'lodash'
import React, { Suspense, useCallback, useRef, useState } from 'react'
import { ActivityIndicator, View, useWindowDimensions } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'
import {
  BottomSheet,
  BottomSheetRef,
  BouncyImage,
  EquipmentDetails,
  FixedHeader,
  Heading,
  IngredientDetails,
  RecipeFavourite,
  Text,
} from '~/components'
import { ADD_TO_FAVOURITES, DELETE_FROM_FAVOURITES } from '~/graphql/mutations'
import { GET_FAVOURITES, GET_RECIPE_DETAILS } from '~/graphql/queries'
import { useSession } from '~/hooks/useSession'
import { shadowLarge } from '~/theme/shadows'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'

const RecipeTabsLazy = React.lazy(() => import('~/components/RecipeTabs'))

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
    fetchPolicy: 'cache-and-network',
  })

  const recipe = data?.recipesCollection?.edges[0]?.node
  const recipesEquipments =
    recipe?.recipesEquipmentsCollection?.edges.map((e) => e.node.equipment) ?? []
  const recipeIngredients = recipe?.recipesIngredientsCollection?.edges?.map((e) => e.node) ?? []
  const recipeSteps = recipe?.stepsCollection?.edges.map((e) => e.node) ?? []

  if (error) {
    return <Text>{error.message}</Text>
  }

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
          <View className="pb-12">
            <Heading h1 loading={loading}>
              {recipe?.name}
            </Heading>
            <Text body>{recipe?.description}</Text>
          </View>

          <View className="bg-white rounded-2xl" style={shadowLarge}>
            <Suspense
              fallback={
                <View className="h-64 justify-center items-center w-full">
                  <ActivityIndicator />
                </View>
              }
            >
              <RecipeTabsLazy
                recipeSteps={recipeSteps}
                recipeIngredients={recipeIngredients}
                recipesEquipments={recipesEquipments}
                onIngredientPress={onIngredientPress}
                onEquipmentPress={onEquipmentPress}
              />
            </Suspense>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}
