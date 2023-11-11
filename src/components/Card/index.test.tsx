import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Card, CardProps } from '.'

const defaultProps: CardProps = {
  imageUrl: 'https://example.com/image.jpg',
  name: 'Example Card',
  id: '1',
}

describe('Card', () => {
  it('renders correctly with default props', () => {
    const { getByTestId, getByText } = render(<Card {...defaultProps} />)
    expect(getByText('Example Card')).toBeTruthy()
    expect(getByTestId('card-image')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(<Card {...defaultProps} onPress={onPress} />)
    fireEvent.press(getByTestId('card'))
    expect(onPress).toHaveBeenCalled()
  })

  it('renders correctly with wide prop', () => {
    const { getByTestId } = render(<Card {...defaultProps} wide />)
    expect(getByTestId('card')).toHaveStyle({ width: 160 })
  })

  it('renders correctly with center prop', () => {
    const { getByText } = render(<Card {...defaultProps} center />)
    expect(getByText('Example Card')).toHaveStyle({ textAlign: 'center' })
  })

  it('renders correctly with styleClassName prop', () => {
    const { getByTestId } = render(<Card {...defaultProps} styleClassName="bg-red-500" />)
    expect(getByTestId('card')).toHaveStyle({ backgroundColor: '#ef4444' })
  })
})
