import { makeVar } from '@apollo/client'
import { createFieldPolicy } from '~/utils/createFieldPolicy'

export enum UnitSystems {
  IMPERIAL = 'imperial',
  METRIC = 'metric',
}

export enum UnitType {
  VOLUME = 'volume',
  MASS = 'mass',
}

export enum JiggerSizes {
  '30ml' = 30,
  '45ml' = 45,
  '50ml' = 50,
  '60ml' = 60,
}

export const defaultJiggerSize = JiggerSizes['60ml']

export const jiggerSizesMetricVar = makeVar([
  { label: '60ml', value: JiggerSizes['60ml'] },
  { label: '50ml', value: JiggerSizes['50ml'] },
])

export const jiggerSizesImperialVar = makeVar([
  { label: '2oz', value: JiggerSizes['60ml'] },
  { label: '1½oz', value: JiggerSizes['45ml'] },
])

export const unitSystemsVar = makeVar([
  {
    label: 'ml',
    value: UnitSystems.METRIC,
  },
  {
    label: 'oz',
    value: UnitSystems.IMPERIAL,
  },
])

export const selectedUnitSystemVar = makeVar<UnitSystems>(UnitSystems.METRIC)
export const selectedJiggerSizeVar = makeVar(JiggerSizes['50ml'])
export const doubleRecipeVar = makeVar<boolean>(false)
export const partialMatchInfoBoxDismissedVar = makeVar(false)
export const totalMatchInfoBoxDismissedVar = makeVar(false)

export const measurementFields = {
  selectedJiggerSize: createFieldPolicy(selectedJiggerSizeVar),
  selectedUnitSystem: createFieldPolicy(selectedUnitSystemVar),
  doubleRecipe: createFieldPolicy(doubleRecipeVar),
  partialMatchInfoBoxDismissed: createFieldPolicy(partialMatchInfoBoxDismissedVar),
  totalMatchInfoBoxDismissed: createFieldPolicy(totalMatchInfoBoxDismissedVar),
}

// Set default values
export const measurementsDefaults = {
  selectedJiggerSize: selectedJiggerSizeVar(),
  selectedUnitSystem: selectedUnitSystemVar(),
  doubleRecipe: doubleRecipeVar(),
  partialMatchInfoBoxDismissed: partialMatchInfoBoxDismissedVar(),
  totalMatchInfoBoxDismissed: totalMatchInfoBoxDismissedVar(),
}
