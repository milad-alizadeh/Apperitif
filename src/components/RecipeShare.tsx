import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { Share } from 'react-native'
import { Units } from '~/__generated__/graphql'
import { defaultJiggerSize } from '~/constants'
import { GET_UNITS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useStore } from '~/providers'
import { convertUnitToOtherSystem } from '~/store'
import { captureError } from '~/utils/captureError'
import { Icon } from './Icon'
import { SkeletonView } from './SkeletonView'

interface RecipeShareProps {
  recipe: any
  loading?: boolean
}

export const RecipeShare: FC<RecipeShareProps> = ({ recipe, loading }) => {
  const { selectedUnitSystem, selectedJiggerSize, doubleRecipe } = useStore()
  const { capture } = useAnalytics()
  const { data: unitsData } = useQuery(GET_UNITS)

  const multiplier = (selectedJiggerSize / defaultJiggerSize) * (doubleRecipe ? 2 : 1)

  const units = unitsData?.unitsCollection?.edges.map((e) => e.node) as Units[]

  const handleShare = async () => {
    const recipeText = `
${recipe?.name}
${recipe?.description}

Ingredients:
${recipe?.recipesIngredientsCollection?.edges
  .map((e) => {
    const { quantity, unit } = e.node
    const { quantity: outputQuantity, unit: outputUnit } = convertUnitToOtherSystem({
      unit: unit as Units,
      toSystem: selectedUnitSystem,
      quantity,
      units,
      multiplier,
    })

    return `- ${e.node.ingredient.name} ${outputQuantity} ${outputUnit}`
  })
  .join('\n')}

Method:
${recipe?.stepsCollection?.edges
  .map((e) => {
    const { number, description } = e.node
    return `${number}. ${description}`
  })
  .join('\n')}

Equipment:
${recipe?.recipesEquipmentCollection?.edges
  .map((e) => {
    const { name } = e.node.equipment
    return `- ${name}`
  })
  .join('\n')}
    `
    try {
      await Share.share({
        title: recipe?.name,
        message: recipeText,
      })

      capture('recipe:share_press', { recipe_name: recipe?.name })
    } catch (error: any) {
      captureError(error)
    }
  }

  return (
    <SkeletonView visible={!loading} width={30} height={30}>
      <Icon
        icon="share"
        accessibilityLabel="Share Recipe"
        accessibilityRole="button"
        onPress={handleShare}
      />
    </SkeletonView>
  )
}
