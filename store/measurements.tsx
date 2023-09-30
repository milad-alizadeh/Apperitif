import { makeVar } from '@apollo/client'

const selectedUnitSystem = makeVar<'metric' | 'imperial'>('metric')
const jiggerSizesMetric = makeVar([50, 60])
const jiggerSizesImperial = makeVar([30, 45, 60])
const selectedJiggerSize = makeVar<30 | 45 | 50 | 60>(50)
const doubleRecipe = makeVar<boolean>(false)
const unitSystems = makeVar(['metric', 'imperial'])
