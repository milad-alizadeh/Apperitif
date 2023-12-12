import { router } from 'expo-router'
import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'
import {
  BouncyImage,
  FixedHeader,
  InfoBox,
  Markdown,
  RecipeFavourite,
  RecipeTabs,
  Text,
} from '~/components'
import { RecipeAttributes } from '~/components/RecipeAttributes'
import { RecipeShare } from '~/components/RecipeShare'
import { useFetchRecipeDetails } from '~/hooks/useFetchRecipeDetails'
import { useSession } from '~/hooks/useSession'
import { shadowLarge } from '~/theme/shadows'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'

export default function RecipeDetailsScreen() {
  const bottomOffset = useSafeAreaInsetsStyle(['bottom'])

  const aref = useAnimatedRef<Animated.ScrollView>()
  const scrollY = useScrollViewOffset(aref)
  const { isLoggedIn } = useSession()

  const headerHeight = useWindowDimensions().width
  const fixedHeaderOffset = headerHeight - 110

  const {
    recipe,
    deleteFromFavourites,
    addToFavourites,
    isFavourite,
    error,
    firstTimeLoading,
    steps,
    mergedRecipeIngredients,
    equipment,
    attributes,
  } = useFetchRecipeDetails()

  return (
    <View className="flex bg-white dark:bg-black flex-1">
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

      <Animated.ScrollView style={bottomOffset} ref={aref} scrollEventThrottle={16}>
        <BouncyImage height={headerHeight} scrollY={scrollY} imageUrl={recipe?.imageUrl} />

        <View className="flex-1 -mt-12 py-8 bg-white dark:bg-neutral-800 rounded-t-[50px] px-6">
          {error && <InfoBox type="error" description={error?.message} />}

          <View>
            <View className="justify-between flex-row">
              <Text
                testID="recipe-name"
                loading={firstTimeLoading}
                skeletonWidth={200}
                h1
                styleClassName="mb-3 "
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

          <View className="bg-white dark:bg-neutral-800 rounded-2xl" style={shadowLarge}>
            <RecipeTabs
              loading={firstTimeLoading}
              steps={steps}
              ingredients={mergedRecipeIngredients}
              equipment={equipment}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}
