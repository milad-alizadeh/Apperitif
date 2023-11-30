import { useQuery, useReactiveVar } from '@apollo/client'
import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { GET_MEASUREMENTS } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useUpdateCache } from '~/hooks/useUpdateCache'
import { jiggerSizesImperialVar, jiggerSizesMetricVar, unitSystemsVar } from '~/store'
import { UnitSystems } from '~/store'
import { SegmentedControl } from './SegmentedControls'
import { Switch } from './Switch'
import { Text } from './Text'

/**
 * A component that displays the recipe measurements and conversions.
 */
export const RecipeMeasurements: FC<{ styleClassName?: string }> = ({ styleClassName }) => {
  const { capture } = useAnalytics()
  const unitSystems = useReactiveVar(unitSystemsVar)
  const jiggerSizesMetric = useReactiveVar(jiggerSizesMetricVar)
  const jiggerSizesImperial = useReactiveVar(jiggerSizesImperialVar)

  const { data } = useQuery(GET_MEASUREMENTS)
  const updateCache = useUpdateCache()

  useEffect(() => {
    updateCache(GET_MEASUREMENTS, { doubleRecipe: false })
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
          selectedValue={data?.selectedUnitSystem as UnitSystems}
          segments={unitSystems}
          testID="unit-system"
          onValueChange={(value) => {
            capture('recipe:unit_press', { unit_type: value })
            updateCache(GET_MEASUREMENTS, {
              selectedUnitSystem: value,
              selectedJiggerSize: currentJiggerSizes(value)[0].value,
            })
          }}
        />
      </View>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          Jigger Size
        </Text>
        <SegmentedControl
          testID="jigger-size"
          selectedValue={data?.selectedJiggerSize}
          segments={currentJiggerSizes(data?.selectedUnitSystem as UnitSystems)}
          onValueChange={(value) => {
            capture('recipe:jigger_size_press', { jigger_size: value })
            updateCache(GET_MEASUREMENTS, { selectedJiggerSize: value })
          }}
        />
      </View>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          2x
        </Text>
        <Switch
          testID="double-recipe"
          value={data?.doubleRecipe}
          onValueChange={(value) => {
            capture('recipe:double_toggle_press', { toggle: value })
            updateCache(GET_MEASUREMENTS, { doubleRecipe: value })
          }}
        />
      </View>
    </View>
  )
}
