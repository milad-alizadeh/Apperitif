import React, { FC } from 'react'
import { View } from 'react-native'
import { jiggerSizeImperialOptions, jiggerSizeMetricOptions, unitSystemOptions } from '~/constants'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useStore } from '~/providers'
import { UnitSystem } from '~/types'
import { SegmentedControl } from './SegmentedControls'
import { Switch } from './Switch'
import { Text } from './Text'

/**
 * A component that displays the recipe measurements and conversions.
 */
export const RecipeMeasurements: FC<{ styleClassName?: string }> = ({ styleClassName }) => {
  const {
    selectedUnitSystem,
    setSelectedUnitSystem,
    setSelectedJiggerSize,
    selectedJiggerSize,
    doubleRecipe,
    setDoubleRecipe,
  } = useStore()
  const { capture } = useAnalytics()

  const currentJiggerSizeOptions = (unitSystem: UnitSystem) =>
    unitSystem === UnitSystem.METRIC ? jiggerSizeMetricOptions : jiggerSizeImperialOptions

  return (
    <View className={`flex-row justify-between ${styleClassName}`}>
      <View className="items-center">
        <Text body weight="medium" styleClassName="text-primary mb-2">
          Unit
        </Text>
        <SegmentedControl
          selectedValue={selectedUnitSystem}
          segments={unitSystemOptions}
          testID="unit-system"
          onValueChange={(value) => {
            setSelectedUnitSystem(value)
            setSelectedJiggerSize(currentJiggerSizeOptions(value)[0].value)
            capture('recipe:unit_press', { unit_type: value })
          }}
        />
      </View>
      <View className="items-center">
        <Text body weight="medium" styleClassName="text-primary mb-2">
          Jigger Size
        </Text>
        <SegmentedControl
          testID="jigger-size"
          selectedValue={selectedJiggerSize}
          segments={currentJiggerSizeOptions(selectedUnitSystem)}
          onValueChange={(value) => {
            setSelectedJiggerSize(value)
            capture('recipe:jigger_size_press', { jigger_size: value })
          }}
        />
      </View>
      <View className="items-center">
        <Text body weight="medium" styleClassName="text-primary mb-2">
          2x
        </Text>
        <Switch
          testID="double-recipe"
          value={doubleRecipe}
          onValueChange={(value) => {
            capture('recipe:double_toggle_press', { toggle: value })
            setDoubleRecipe(value)
          }}
        />
      </View>
    </View>
  )
}
