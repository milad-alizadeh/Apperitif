// import { useQuery, useReactiveVar } from '@apollo/client'
import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { unitSystemOptions } from '~/constants'
// import { GET_LOCAL_STATE } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useLocalState } from '~/providers'
// import { useUpdateCache } from '~/hooks/useUpdateCache'
// import { jiggerSizesImperialVar, jiggerSizesMetricVar, unitSystemsVar } from '~/store'
// import { UnitSystems } from '~/store'
import { SegmentedControl } from './SegmentedControls'
import { Switch } from './Switch'
import { Text } from './Text'

/**
 * A component that displays the recipe measurements and conversions.
 */
export const RecipeMeasurements: FC<{ styleClassName?: string }> = ({ styleClassName }) => {
  const { selectedUnitSystem, setSelectedUnitSystem } = useLocalState()
  const { capture } = useAnalytics()
  // const unitSystems = useReactiveVar(unitSystemsVar)

  // const jiggerSizesMetric = useReactiveVar(jiggerSizesMetricVar)
  // const jiggerSizesImperial = useReactiveVar(jiggerSizesImperialVar)

  // const { data } = useQuery(GET_LOCAL_STATE)
  // const updateCache = useUpdateCache()

  // useEffect(() => {
  //   updateCache(GET_LOCAL_STATE, { doubleRecipe: false })
  // }, [])

  // const currentJiggerSizes = (unitSystem: UnitSystems) =>
  //   unitSystem === UnitSystems.METRIC ? jiggerSizesMetric : jiggerSizesImperial

  return (
    <View className={`flex-row justify-between ${styleClassName}`}>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          Unit
        </Text>
        <SegmentedControl
          selectedValue={selectedUnitSystem}
          segments={unitSystemOptions}
          testID="unit-system"
          onValueChange={(value) => {
            capture('recipe:unit_press', { unit_type: value })
            setSelectedUnitSystem(value)
            // updateCache(GET_LOCAL_STATE, {
            //   selectedUnitSystem: value,
            //   // selectedJiggerSize: currentJiggerSizes(value)[0].value,
            // })
          }}
        />
      </View>
      {/* <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          Jigger Size
        </Text>
        <SegmentedControl
          testID="jigger-size"
          selectedValue={data?.selectedJiggerSize}
          segments={currentJiggerSizes(data?.selectedUnitSystem as UnitSystems)}
          onValueChange={(value) => {
            capture('recipe:jigger_size_press', { jigger_size: value })
            updateCache(GET_LOCAL_STATE, { selectedJiggerSize: value })
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
            updateCache(GET_LOCAL_STATE, { doubleRecipe: value })
          }}
        />
      </View> */}
    </View>
  )
}
