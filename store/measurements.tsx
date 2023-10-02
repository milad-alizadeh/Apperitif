import { makeVar } from '@apollo/client'
import { Units } from '~/__generated__/graphql'

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

export const jiggerSizesMetricVar = makeVar([
  { label: '50ml', value: JiggerSizes['50ml'] },
  { label: '60ml', value: JiggerSizes['60ml'] },
])

export const jiggerSizesImperialVar = makeVar([
  { label: '1oz', value: JiggerSizes['30ml'] },
  { label: '1½oz', value: JiggerSizes['45ml'] },
  { label: '2oz', value: JiggerSizes['60ml'] },
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

export const unitsVar = makeVar<Units[]>([])

// Helper function to get the correct unit name based on quantity
const getUnitName = (unit: Units, quantity: number) => {
  return quantity > 1 ? unit.plural : unit.abbreviation
}

export const formatQuantity = (quantity: string | null): string | null => {
  if (quantity === null) return quantity // if quantity is null, return it as is.

  const parsedQuantity = parseFloat(quantity)

  if (isNaN(parsedQuantity)) throw new Error('Quantity is not a valid number')

  const formatted = parseFloat(parsedQuantity.toFixed(2))
  return (formatted % 1 === 0 ? Math.floor(formatted) : formatted).toString()
}

// Helper function to get the result object
const getConversionResult = (quantity: string | null, unit: Units) => {
  const formattedQuantity = formatQuantity(quantity)
  return {
    quantity: formattedQuantity,
    unit: getUnitName(unit, parseFloat(formattedQuantity || '0')),
  }
}

export const convertUnitToOtherSystem = (
  unit: Units,
  toSystem: UnitSystems,
  quantity: string | null,
  allUnits: Units[],
) => {
  // If the unit is not convertible or quantity is null, return the original quantity and unit name
  if (!unit.isConvertable || !quantity)
    return {
      ...getConversionResult(quantity, unit),
      converted: false,
    }

  // If the unit is already in the desired system, return the original quantity and unit name
  if (unit.system === toSystem)
    return {
      ...getConversionResult(quantity, unit),
      converted: true,
    }

  // Convert to base unit if there is a base unit ID and a base conversion factor
  const baseQuantity = unit.baseUnitId
    ? parseFloat(formatQuantity(quantity) || '0') * (unit.baseConversionFactor || 1)
    : parseFloat(formatQuantity(quantity) || '0')

  // Convert base quantity to the other system using the system to system conversion factor
  const convertedQuantity = formatQuantity(
    (baseQuantity * (unit.systemToSystemConversionFactor || 1)).toString(),
  )

  // Find the base unit of the other system of the same type
  const convertedBaseUnit = allUnits.find(
    (u) => u.type === unit.type && u.system === toSystem && !u.baseUnitId,
  )

  if (!convertedBaseUnit) {
    throw new Error(`Could not find base unit for ${unit.name} in ${toSystem} system`)
  }

  // Return the converted quantity and the appropriate unit name of the other system
  return {
    ...getConversionResult(convertedQuantity, convertedBaseUnit),
    converted: true,
  }
}
