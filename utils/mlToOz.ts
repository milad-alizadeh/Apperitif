type Fraction = '¼' | '⅓' | '½' | '⅔' | '¾' | ''

export const mlToOz = function mlToOz(ml: number): string {
  const oz = ml * 0.033814
  let base = Math.floor(oz)
  let fraction = getNearestFraction(oz % 1)

  // If the fraction is '¾', we increase the base and reset the fraction
  if (fraction === '¾' && oz % 1 >= 0.875) {
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

function getNearestFraction(decimal: number): Fraction {
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
