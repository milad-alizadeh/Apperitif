import { Units } from '~/__generated__/graphql'
import { UnitSystem } from '~/types'

type Fraction = '¼' | '⅓' | '½' | '⅔' | '¾' | ''

const OUNCE_TO_CUP_CONVERSION_THRESHOLD = 3

/**
 * Returns the nearest fraction to a given decimal number.
 * @param decimal - The decimal number to find the nearest fraction for.
 * @returns The nearest fraction as a string.
 */
export const getNearestFraction = (decimal: number): Fraction => {
  const fractions: { [key in Fraction]: number } = {
    '': 0,
    '¼': 0.25,
    '⅓': 1 / 3,
    '½': 0.5,
    '⅔': 2 / 3,
    '¾': 0.75,
  }

  let minDifference = 1 // A value larger than any possible difference
  let nearestFraction: Fraction = ''

  for (const fraction in fractions) {
    const difference = Math.abs(decimal - fractions[fraction as Fraction])
    if (difference < minDifference) {
      minDifference = difference
      nearestFraction = fraction as Fraction
    }
  }

  return nearestFraction
}

/**
 * Converts a decimal quantity to a mixed number string representation.
 * @param quantity - The decimal quantity to convert.
 * @returns A string representation of the mixed number.
 */
export const toFractions = (quantity: number): string => {
  let base = Math.floor(quantity)
  let fraction = getNearestFraction(quantity % 1)

  // If the fraction is '¾', we increase the base and reset the fraction
  if (fraction === '¾' && quantity % 1 >= 0.875) {
    base++
    fraction = ''
  }

  if (base === 0 && fraction !== '') {
    return fraction
  } else if (fraction !== '') {
    return `${base} ${fraction}`
  } else {
    return `${base}`
  }
}

export const getUnitName = (unit: Units, quantity: number) => {
  return quantity > 1 ? unit.plural : unit.abbreviation
}

/**
 * Formats a quantity string to a string with two decimal places.
 * If the input is null, it returns null.
 * If the input is not a valid number, it throws an error.
 * @param quantity - The quantity string to format.
 * @returns The formatted quantity string.
 * @throws An error if the input is not a valid number.
 */
export const formatQuantity = (quantity: string | null): string | null => {
  if (quantity === null) return quantity // if quantity is null, return it as is.
  const parsedQuantity = parseFloat(quantity)
  if (isNaN(parsedQuantity)) {
    throw new Error(`Quantity is not a valid number`)
  }

  const formatted = parseFloat(parsedQuantity.toFixed(2))
  return (formatted % 1 === 0 ? Math.floor(formatted) : formatted).toString()
}

/**
 * Returns an object containing the converted quantity and unit name.
 * @param quantity - The quantity to be converted.
 * @param unit - The unit to convert to.
 * @returns An object containing the converted quantity and unit name.
 */
export const getConversionResult = (quantity: string | null, unit: Units) => {
  const formattedQuantity = formatQuantity(quantity)
  return {
    quantity: !quantity ? '' : formattedQuantity,
    unit: !unit ? '' : getUnitName(unit, parseFloat(formattedQuantity || '0')),
  }
}

/**
 * Converts a quantity from one unit system to another.
 * @param unit The unit to convert from.
 * @param toSystem The unit system to convert to.
 * @param quantity The quantity to convert.
 * @param allUnits An array of all available units.
 * @returns An object containing the converted quantity and the appropriate unit name of the other system.
 * @throws An error if the quantity is not a valid number or if the base unit for the other system of the same type cannot be found.
 */
export const convertUnitToOtherSystem = ({
  unit,
  toSystem,
  quantity,
  units,
  multiplier = 1,
}: {
  unit: Units
  toSystem: UnitSystem
  quantity: string | null
  units: Units[] | null
  multiplier?: number
}) => {
  // If it's not convertible then only apply the multiplier if there is quantity and round it to a whole number
  if (!unit?.isConvertable || quantity === null) {
    if (quantity !== null) {
      const multipliedQuantity = parseFloat(quantity) * multiplier
      const roundedQuantity = Math.round(multipliedQuantity).toString()
      return getConversionResult(roundedQuantity, unit)
    }
    return getConversionResult(quantity, unit)
  }

  // Additional logic for converting ounces to cups if the quantity is more than 8oz
  const cupsUnit = units.find((u) => u.abbreviation === 'cup')
  if (!cupsUnit) {
    throw new Error(`Could not find cup unit`)
  }

  // If the unit is already in the desired system, return the original quantity and unit name
  if (unit.system === toSystem) {
    let outputUnit = unit
    let outputQuantityInt = parseFloat(quantity)

    if (
      toSystem === UnitSystem.IMPERIAL &&
      outputQuantityInt >= cupsUnit.baseConversionFactor / OUNCE_TO_CUP_CONVERSION_THRESHOLD
    ) {
      outputQuantityInt = outputQuantityInt / cupsUnit.baseConversionFactor
      outputUnit = cupsUnit
    }

    const multipliedQuantity = outputQuantityInt * multiplier
    let outputQuantity: string = ''

    if (toSystem === UnitSystem.METRIC) {
      // Round to the nearest 2.5 if the unit is imperial
      outputQuantity = (Math.round(multipliedQuantity / 2.5) * 2.5).toString()
    } else {
      outputQuantity = toFractions(multipliedQuantity)
    }

    return {
      quantity: outputQuantity,
      unit: getUnitName(outputUnit, parseFloat(outputQuantity || '0')),
    }
  }

  const quantityFloat = parseFloat(quantity) * multiplier

  if (isNaN(quantityFloat)) {
    throw new Error(`Quantity is not a valid number`)
  }

  // Convert to base unit if there is a base unit ID and a base conversion factor
  const baseQuantity = unit.baseUnitId
    ? quantityFloat * (unit.baseConversionFactor || 1)
    : quantityFloat

  // Convert base quantity to the other system using the system to system conversion factor
  let convertedQuantity = baseQuantity * (unit.systemToSystemConversionFactor || 1)

  // Find the base unit of the other system of the same type
  let convertedBaseUnit = units.find(
    (u) => u.type === unit.type && u.system === toSystem && !u.baseUnitId,
  )

  if (!convertedBaseUnit)
    throw new Error(`Could not find base unit for ${unit.name} in ${toSystem} system`)

  if (
    toSystem === UnitSystem.IMPERIAL &&
    convertedQuantity > cupsUnit.baseConversionFactor / OUNCE_TO_CUP_CONVERSION_THRESHOLD
  ) {
    convertedQuantity = convertedQuantity / cupsUnit.baseConversionFactor
    convertedBaseUnit = cupsUnit
  }

  // Convert to nearest fraction if the unit system is imperial
  const outputQuantity =
    toSystem === UnitSystem.IMPERIAL
      ? toFractions(convertedQuantity)
      : formatQuantity(convertedQuantity.toString())

  // Return the converted quantity and the appropriate unit name of the other system
  return {
    quantity: outputQuantity,
    unit: getUnitName(convertedBaseUnit, parseFloat(outputQuantity || '0')),
  }
}
