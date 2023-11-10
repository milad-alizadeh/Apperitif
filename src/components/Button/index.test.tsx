import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { useHaptic } from '~/hooks/useHaptics'
import { Button, ButtonProps } from './index'

jest.mock('~/hooks/useHaptic', () => ({
  useHaptic: () => jest.fn(),
}))

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button label="Click me" />)
    expect(getByText('Click me')).toBeTruthy()
  })

  it('renders loading indicator when loading is true', () => {
    const { getByTestId } = render(<Button label="Click me" loading />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('renders large button when large is true', () => {
    const { getByText, getByTestId } = render(<Button label="Click me" large />)
    expect(getByTestId('button')).toHaveStyle({ height: 48 })
    expect(getByText('Click me')).toHaveStyle({ fontSize: 20 })
  })

  it('renders outline button when outline is true', () => {
    const { getByText, getByTestId } = render(<Button label="Click me" outline />)
    expect(getByTestId('button')).toHaveStyle({ backgroundColor: 'transparent' })
  })

  it('renders custom style class name', () => {
    const { getByTestId } = render(<Button label="Click me" styleClassName="bg-red-500" />)
    expect(getByTestId('button')).toHaveStyle({ backgroundColor: '#ef4444' })
  })

  it('renders button with haptics when enableHaptics is true', () => {
    const useHapticMock = jest.fn()

    const { getByTestId } = render(<Button label="Click me" enableHaptics />)
    fireEvent.press(getByTestId('button'))

    // Asserting that useHaptic is called with 'light'
    expect(useHaptic).toHaveBeenCalledWith('light')
    // Asserting that the function returned by useHaptic is called
    expect(useHapticMock).toHaveBeenCalled()
  })

  it('calls onPress function when button is pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(<Button label="Click me" onPress={onPress} />)
    fireEvent.press(getByText('Click me'))
    expect(onPress).toHaveBeenCalled()
  })
})
