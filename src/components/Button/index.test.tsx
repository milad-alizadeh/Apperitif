import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Button, ButtonProps } from './index'

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button label="Click me" />)
    expect(getByText('Click me')).toBeTruthy()
  })
  it('renders loading indicator when loading is true', () => {
    const { getByTestId } = render(<Button label="Click me" loading />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })
  it('calls onPress function when button is pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(<Button label="Click me" onPress={onPress} />)
    fireEvent.press(getByText('Click me'))
    expect(onPress).toHaveBeenCalled()
  })
})
