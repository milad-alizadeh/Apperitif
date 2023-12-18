import { usePathname } from 'expo-router'
import React, { MutableRefObject, Ref, useEffect } from 'react'
import { View } from 'react-native'
import { useFetchIngredientDetails, useSession } from '~/hooks'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'
import { BottomSheetRef } from './BottomSheet'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { HorizontalList } from './HorizontalList'
import { Markdown } from './Markdown'
import { Text } from './Text'

/**
 * Props for the IngredientDetails component
 */
export interface IngredientDetailsProps {
  /** The ID of the ingredient to display details for */
  ingredientId: string
  modalRef?: MutableRefObject<BottomSheetRef>
}

/**
 * A component that displays details for a specific ingredient
 */
export const IngredientDetails = function IngredientDetails({
  ingredientId,
  modalRef,
}: IngredientDetailsProps) {
  const path = usePathname()
  const showCta = path !== '/add-ingredients'
  const inset = useSafeAreaInsetsStyle(['bottom'], 'margin')
  const { screen, capture } = useAnalytics()
  const { isLoggedIn } = useSession()
  const {
    ingredient,
    loading,
    recipesLoading,
    availableRecipes,
    addLoading,
    isInMyBar,
    handleAddToMyBar,
    handleDeleteFromMyBar,
  } = useFetchIngredientDetails(ingredientId, modalRef)

  useEffect(() => {
    if (!ingredient) return
    screen('/ingredient', { ingredient_name: ingredient?.name })
  }, [ingredient])

  return (
    <>
      {loading || recipesLoading ? null : (
        <View className="justify-start flex-1 px-6 pt-6 pb-3" style={inset}>
          {/* Name */}
          <View className="mb-3">
            {ingredient?.name && (
              <Text h2 weight="bold" styleClassName="pr-10 flex-1" testID="ingredient-name">
                {ingredient?.name}
              </Text>
            )}
          </View>

          {/* Description */}
          <View className="mb-3">
            <Markdown
              testID="ingredient-description"
              externalLinkEventLabel="ingredient:external_link_press"
              text={ingredient?.description}
            />
          </View>

          {/* Related Recipes */}
          {!!availableRecipes.length && (
            <View className="-mx-6 min-h-[200px]">
              <HorizontalList
                listItems={availableRecipes as any}
                title="Used in"
                showCount={false}
              />
            </View>
          )}

          {isLoggedIn && showCta && (
            <View className="mt-auto">
              {/* Stock information */}
              <View className="flex-row items-center mr-2 rounded-xl mt-6">
                <Checkbox checked={isInMyBar} disabled styleClassName="mr-3" />
                <Text body weight="bold">
                  {isInMyBar ? 'In My Bar' : 'You don’t have this ingredient in your bar'}
                </Text>
              </View>

              <Button
                styleClassName="mt-6"
                loading={addLoading}
                large
                label={isInMyBar ? 'Remove from my bar' : 'Add to my bar'}
                enableHaptics
                onPress={() => {
                  if (isInMyBar) {
                    capture('ingredient:ingredient_remove', {
                      ingredient_name: ingredient?.name,
                    })
                    handleDeleteFromMyBar(ingredientId)
                  } else {
                    capture('ingredient:ingredient_add', {
                      ingredient_name: ingredient?.name,
                    })
                    handleAddToMyBar(ingredientId)
                  }
                }}
              />
            </View>
          )}
        </View>
      )}
    </>
  )
}
