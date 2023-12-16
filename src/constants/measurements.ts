import { JiggerSize, UnitSystem } from '~/types'

export const jiggerSizeMetricOptions = [
  { label: '60ml', value: JiggerSize['60ml'] },
  { label: '50ml', value: JiggerSize['50ml'] },
]

export const jiggerSizeImperialOptions = [
  { label: '2oz', value: JiggerSize['60ml'] },
  { label: '1½oz', value: JiggerSize['45ml'] },
]

export const unitSystemOptions = [
  {
    label: 'ml',
    value: UnitSystem.METRIC,
    accessibilityLabel: 'milliliters',
  },
  {
    label: 'oz',
    value: UnitSystem.IMPERIAL,
    accessibilityLabel: 'ounces',
  },
]

export const defaultJiggerSize = JiggerSize['60ml']
export const defaultUnitSystem = UnitSystem.METRIC
