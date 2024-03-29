import { Units } from '~/__generated__/graphql'
import { UnitSystem } from '~/types'
import { convertUnitToOtherSystem, toFractions } from './unitConversions'

describe('Conversions', () => {
  describe('toFractions', () => {
    test('should return fraction when quantity is a fraction', () => {
      expect(toFractions(0.25)).toBe('¼')
      expect(toFractions(1 / 3)).toBe('⅓')
      expect(toFractions(0.5)).toBe('½')
      expect(toFractions(2 / 3)).toBe('⅔')
      expect(toFractions(0.75)).toBe('¾')
    })

    test('should return base when quantity is a whole number', () => {
      expect(toFractions(1)).toBe('1')
      expect(toFractions(2)).toBe('2')
      expect(toFractions(3)).toBe('3')
    })

    test('should return mixed number when quantity is a mixed number', () => {
      expect(toFractions(1.25)).toBe('1 ¼')
      expect(toFractions(2 + 1 / 3)).toBe('2 ⅓')
      expect(toFractions(3.5)).toBe('3 ½')
      expect(toFractions(4 + 2 / 3)).toBe('4 ⅔')
      expect(toFractions(5.75)).toBe('5 ¾')
    })

    test('should round up and return base when fraction is ¾ and decimal is >= 0.875', () => {
      expect(toFractions(0.875)).toBe('1')
      expect(toFractions(0.9)).toBe('1')
      expect(toFractions(1.1)).toBe('1')
      expect(toFractions(1.875)).toBe('2')
      expect(toFractions(1.9)).toBe('2')
    })

    test('should handle zero', () => {
      expect(toFractions(0)).toBe('0')
    })
  })
})

// Mock Data
const mockUnits: Units[] = [
  {
    id: '1',
    system: UnitSystem.METRIC,
    type: 'volume',
    abbreviation: 'ml',
    plural: 'ml',
    isConvertable: true,
    baseConversionFactor: 1,
    systemToSystemConversionFactor: 0.033814,
    baseUnitId: null,
    createdAt: '2023-10-03T00:00:00Z',
    updatedAt: '2023-10-03T00:00:00Z',
    name: 'milliliter',
    nodeId: 'node1',
    recipesIngredientsCollection: null,
    unitsCollection: null,
  },
  {
    id: '2',
    system: UnitSystem.IMPERIAL,
    type: 'volume',
    abbreviation: 'oz',
    plural: 'oz',
    isConvertable: true,
    baseConversionFactor: 29.5735,
    systemToSystemConversionFactor: 29.5735,
    baseUnitId: null,
    createdAt: '2023-10-03T00:00:00Z',
    updatedAt: '2023-10-03T00:00:00Z',
    name: 'ounce',
    nodeId: 'node2',
    recipesIngredientsCollection: null,
    unitsCollection: null,
  },
  {
    id: '3',
    system: UnitSystem.IMPERIAL,
    type: 'volume',
    abbreviation: 'cup',
    plural: 'cups',
    isConvertable: true,
    baseConversionFactor: 8,
    systemToSystemConversionFactor: null,
    baseUnitId: '3f14df53-61ff-4ece-bba8-9cf477e0110b',
    createdAt: '2023-10-03T00:00:00Z',
    updatedAt: '2023-10-03T00:00:00Z',
    name: 'cup',
    nodeId: 'node3',
    unitsCollection: null,
  },
]

describe('convertUnitToOtherSystem', () => {
  test('should return original quantity and unit name if unit is not convertible', () => {
    const nonConvertibleUnit: Units = {
      ...mockUnits[0],
      isConvertable: false,
    }
    const result = convertUnitToOtherSystem({
      unit: nonConvertibleUnit,
      toSystem: UnitSystem.IMPERIAL,
      quantity: '100',
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '100',
      unit: 'ml',
    })
  })

  test('should return original quantity and unit name if quantity is null', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits[0],
      toSystem: UnitSystem.IMPERIAL,
      quantity: null,
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '',
      unit: 'ml',
    })
  })

  test('should throw error if quantity is not a valid number', () => {
    expect(() =>
      convertUnitToOtherSystem({
        unit: mockUnits[0],
        toSystem: UnitSystem.IMPERIAL,
        quantity: 'invalid',
        units: mockUnits,
      }),
    ).toThrow()
  })

  test('should convert unit to other system and return converted quantity and unit name', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits[0],
      toSystem: UnitSystem.IMPERIAL,
      quantity: '1000',
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '4 ¼',
      unit: 'cups',
    })
  })

  test('should return original quantity and unit name if the unit is already in the desired system', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits[1],
      toSystem: UnitSystem.IMPERIAL,
      quantity: '5',
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '⅔',
      unit: 'cup',
    })
  })

  test('should correctly apply the multiplier to the quantity', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits[0],
      toSystem: UnitSystem.IMPERIAL,
      quantity: '60',
      units: mockUnits,
      multiplier: 0.75,
    })
    expect(result).toEqual({
      quantity: '1 ½',
      unit: 'oz',
    })
  })

  test('should correctly apply a different multiplier to the quantity', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits[0],
      toSystem: UnitSystem.IMPERIAL,
      quantity: '60',
      units: mockUnits,
      multiplier: 0.83,
    })
    expect(result).toEqual({
      quantity: '1 ⅔', // 1000 ml * 0.83 to oz
      unit: 'oz',
    })
  })

  test('should correctly apply a multiplier of 2 to the quantity', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits[0],
      toSystem: UnitSystem.IMPERIAL,
      quantity: '1000',
      units: mockUnits,
      multiplier: 2,
    })
    expect(result).toEqual({
      quantity: '8 ½', // 1000 ml * 2 to oz
      unit: 'cups',
    })
  })

  test('should convert ounces to cups when quantity exceeds 8 ounces', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits[1],
      toSystem: UnitSystem.IMPERIAL,
      quantity: '9',
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '1', // 9 oz converted to cups
      unit: 'cup',
    })
  })

  test('should handle conversion exactly at 8 ounces', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits.find((u) => u.abbreviation === 'oz'),
      toSystem: UnitSystem.IMPERIAL,
      quantity: '8',
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '1', // 8 oz is exactly 1 cup
      unit: 'cup',
    })
  })

  test('should handle less than  a cup and bigger than 4 ounces', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits.find((u) => u.abbreviation === 'oz'),
      toSystem: UnitSystem.IMPERIAL,
      quantity: '4',
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '½', // 8 oz is exactly 1 cup
      unit: 'cup',
    })
  })

  test('should handle large quantities converting from ounces to cups', () => {
    const result = convertUnitToOtherSystem({
      unit: mockUnits.find((u) => u.abbreviation === 'oz'),
      toSystem: UnitSystem.IMPERIAL,
      quantity: '24',
      units: mockUnits,
    })
    expect(result).toEqual({
      quantity: '3', // 24 oz converted to cups
      unit: 'cups',
    })
  })
})
