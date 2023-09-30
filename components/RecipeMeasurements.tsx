import { useReactiveVar } from '@apollo/client'
import * as React from 'react'
import { View } from 'react-native'
import {
  doubleRecipeVar,
  jiggerSizesImperialVar,
  jiggerSizesMetricVar,
  selectedJiggerSizeVar,
  selectedUnitSystemVar,
  unitSystemsVar,
} from '~/store'
import { SegmentedControl } from './SegmentedControls'
// import SegmentedControl from 'react-native-ui-lib/segmentedControl'
import { Switch } from './Switch'
import { Text } from './Text'

/**
 * A component that displays the recipe measurements and conversions.
 */
export const RecipeMeasurements = function RecipeMeasurements() {
  // const { recipeStore } = useStores()

  // recipeStore.setDefaultMeasurements()

  // const { units, availableJiggerSizes, setSelectedJiggerSize, doubleRecipe, setProp, setUnit } =
  // recipeStore?.measurements[0]
  const unitSystems = useReactiveVar(unitSystemsVar)
  const jiggerSizesMetric = useReactiveVar(jiggerSizesMetricVar)
  const jiggerSizesImperial = useReactiveVar(jiggerSizesImperialVar)
  const doubleRecipe = useReactiveVar(doubleRecipeVar)
  const selectedUnitSystem = useReactiveVar(selectedUnitSystemVar)
  const selectedJiggerSize = useReactiveVar(selectedJiggerSizeVar)

  const currentJiggerSizes =
    selectedUnitSystem === 'metric' ? jiggerSizesMetric : jiggerSizesImperial

  return (
    <View className="flex-row justify-between pb-6 mb-6 border-b-[1px] border-primary">
      {/* <View>
        <Text h4 styleClassName="text-primary mb-2">
          Unit
        </Text>
        <SegmentedControl
          onChangeIndex={(i) => setUnit(units[i])}
          segments={units.map((unit) => ({ label: unit }))}
        />
      </View> */}
      <View className="min-w-[120px]">
        <Text h4 styleClassName="text-primary mb-2">
          Jigger Size
        </Text>
        <SegmentedControl
          segments={currentJiggerSizes}
          onValueChange={(value) => selectedJiggerSize}
          // onChangeIndex={(i) => setSelectedJiggerSize(availableJiggerSizes[i].size)}
          // segments={availableJiggerSizes.map((jigger) => ({
          //   label: jigger.label,
          // }))}
        />
      </View>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          Recipe 2x
        </Text>
        <Switch value={doubleRecipe} onValueChange={(value) => doubleRecipeVar(value)} />
      </View>
    </View>
  )
}
