import * as React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Text } from '~/components/Text'
import SegmentedControl from 'react-native-ui-lib/segmentedControl'
import Switch from 'react-native-ui-lib/switch'
import { useStores } from '~/models'

/**
 * A component that displays the recipe measurements and conversions.
 */
export const RecipeMeasurements = observer(function RecipeMeasurements() {
  const { recipeStore } = useStores()

  recipeStore.setDefaultMeasurements()

  const { units, availableJiggerSizes, setSelectedJiggerSize, doubleRecipe, setProp, setUnit } =
    recipeStore?.measurements[0]

  return (
    <View className="flex-row justify-between pb-6 mb-6 border-b-[1px] border-primary">
      <View>
        <Text h4 styleClassName="text-primary mb-2">
          Unit
        </Text>
        <SegmentedControl
          onChangeIndex={(i) => setUnit(units[i])}
          segments={units.map((unit) => ({ label: unit }))}
        />
      </View>
      <View className="min-w-[120px]">
        <Text h4 styleClassName="text-primary mb-2">
          Jigger Size
        </Text>
        <SegmentedControl
          onChangeIndex={(i) => setSelectedJiggerSize(availableJiggerSizes[i].size)}
          segments={availableJiggerSizes.map((jigger) => ({
            label: jigger.label,
          }))}
        />
      </View>
      <View className="items-center">
        <Text h4 styleClassName="text-primary mb-2">
          Recipe 2x
        </Text>
        <Switch
          width={54}
          height={32}
          thumbSize={24}
          value={doubleRecipe}
          onValueChange={() => setProp('doubleRecipe', !doubleRecipe)}
        />
      </View>
    </View>
  )
})
