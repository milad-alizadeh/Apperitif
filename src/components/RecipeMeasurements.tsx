import { useReactiveVar } from '@apollo/client'
import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import {
  doubleRecipeVar,
  jiggerSizesImperialVar,
  jiggerSizesMetricVar,
  selectedJiggerSizeVar,
  selectedUnitSystemVar,
  unitSystemsVar,
} from '~/store'
import { UnitSystems } from '~/store'
import { SegmentedControl } from './SegmentedControls'
import { Switch } from './Switch'
import { Text } from './Text'

/**
 * A component that displays the recipe measurements and conversions.
 */
export const RecipeMeasurements: FC<{ styleClassName?: string }> = ({ styleClassName }) => {
  const unitSystems = useReactiveVar(unitSystemsVar)
  const jiggerSizesMetric = useReactiveVar(jiggerSizesMetricVar)
  const jiggerSizesImperial = useReactiveVar(jiggerSizesImperialVar)
  const doubleRecipe = useReactiveVar(doubleRecipeVar)
  const selectedUnitSystem = useReactiveVar(selectedUnitSystemVar)
  const selectedJiggerSize = useReactiveVar(selectedJiggerSizeVar)

  useEffect(() => {
    doubleRecipeVar(false)
  }, [])

  const currentJiggerSizes = (unitSystem: UnitSystems) =>
    unitSystem === UnitSystems.METRIC ? jiggerSizesMetric : jiggerSizesImperial

  return (
    <View className={`flex-row justify-between ${styleClassName}`}>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          Unit
        </Text>
        <SegmentedControl
          selectedValue={selectedUnitSystem}
          segments={unitSystems}
          onValueChange={(value) => {
            selectedUnitSystemVar(value)
            selectedJiggerSizeVar(currentJiggerSizes(value)[0].value)
          }}
        />
      </View>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          Jigger Size
        </Text>
        <SegmentedControl
          selectedValue={selectedJiggerSize}
          segments={currentJiggerSizes(selectedUnitSystem)}
          onValueChange={(value) => selectedJiggerSizeVar(value)}
        />
      </View>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          2x
        </Text>
        <Switch value={doubleRecipe} onValueChange={(value) => doubleRecipeVar(value)} />
      </View>
    </View>
  )
}
