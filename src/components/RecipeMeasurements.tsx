import { useQuery, useReactiveVar } from '@apollo/client'
import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { GET_MEASUREMENTS } from '~/graphql/queries'
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
          onValueChange={(value) => {
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
          selectedValue={data?.selectedJiggerSize}
          segments={currentJiggerSizes(data?.selectedUnitSystem as UnitSystems)}
          onValueChange={(value) => updateCache(GET_MEASUREMENTS, { selectedJiggerSize: value })}
        />
      </View>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          2x
        </Text>
        <Switch
          value={data?.doubleRecipe}
          onValueChange={(value) => updateCache(GET_MEASUREMENTS, { doubleRecipe: value })}
        />
      </View>
    </View>
  )
}
