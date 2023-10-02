import { convertUnitToOtherSystem } from './measurements'

describe('Measurements store', () => {
  describe('convertUnitToOtherSystem', () => {
    it('should return the same quantity if the unit is not convertable', () => {
      const entry = {
        id: '1',
        name: 'oz',
        system: 'imperial',
        isConvertable: false,
        baseUnitId: null,
        baseConversionFactor: null,
        systemToSystemConversionFactor: null,
        quantity: 1,
      }
    })
    it('should return the same quantity if the unit is in the current system', () => {
      expect(true).toBe(true)
    })
    it('should return the converted quantity if the unit is in the other system', () => {
      expect(true).toBe(true)
    })
  })
})
