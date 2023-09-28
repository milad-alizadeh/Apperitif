import { mlToOz } from './mlToOz' // replace it with your actual filename

describe('mlToOz', () => {
  it('should convert ml to whole number oz accurately', () => {
    expect(mlToOz(30)).toBe('1')
    expect(mlToOz(60)).toBe('2')
    expect(mlToOz(90)).toBe('3')
  })

  it('should convert ml to oz with fractions accurately', () => {
    expect(mlToOz(10)).toBe('⅓')
    expect(mlToOz(20)).toBe('⅔')
    expect(mlToOz(65)).toBe('2 ¼')
    expect(mlToOz(70)).toBe('2 ⅓')

    expect(mlToOz(85)).toBe('2 ¾')
    expect(mlToOz(95)).toBe('3 ¼')
    expect(mlToOz(100)).toBe('3 ⅓')
  })
})
