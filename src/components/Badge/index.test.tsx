import { render } from '@testing-library/react-native'
import React from 'react'
import { Badge } from '.'

describe('Badge', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(<Badge label="2" />)
    expect(getByText('2')).toBeTruthy()
  })

  it('renders custom style class name', () => {
    const { getByTestId } = render(<Badge label="2" styleClassName="bg-red-500" />)
    expect(getByTestId('badge')).toHaveStyle({ backgroundColor: '#ef4444' })
  })
})
