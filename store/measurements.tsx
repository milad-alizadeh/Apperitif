import { makeVar } from '@apollo/client'

export const jiggerSizesMetricVar = makeVar<{ label: string; value: number }[]>([
  { label: '50ml', value: 50 },
  { label: '60ml', value: 60 },
])
export const jiggerSizesImperialVar = makeVar<{ label: string; value: number }[]>([
  { label: '1oz', value: 30 },
  { label: '1½oz', value: 45 },
  { label: '2oz', value: 60 },
])
export const unitSystemsVar = makeVar(['metric', 'imperial'])

export const selectedUnitSystemVar = makeVar<'metric' | 'imperial'>('metric')
export const selectedJiggerSizeVar = makeVar(50)
export const doubleRecipeVar = makeVar<boolean>(false)
