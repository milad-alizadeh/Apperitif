import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { Share } from 'react-native'
import { Units } from '~/__generated__/graphql'
import { GET_MEASUREMENTS, GET_UNITS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { UnitSystems, convertUnitToOtherSystem, defaultJiggerSize } from '~/store'
import { captureError } from '~/utils/captureError'
import { Icon } from './Icon'
import { SkeletonView } from './SkeletonView'

interface RecipeShareProps {
  recipe: any
  loading?: boolean
}

export const RecipeShare: FC<RecipeShareProps> = ({ recipe, loading }) => {
  const { capture } = useAnalytics()
  const { data: unitsData } = useQuery(GET_UNITS)
  const { data: measurements } = useQuery(GET_MEASUREMENTS)

  const multiplier =
    (measurements?.selectedJiggerSize / defaultJiggerSize) * (measurements?.doubleRecipe ? 2 : 1)

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
      toSystem: measurements?.selectedUnitSystem as UnitSystems,
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
      <Icon icon="share" onPress={handleShare} />
    </SkeletonView>
  )
}
