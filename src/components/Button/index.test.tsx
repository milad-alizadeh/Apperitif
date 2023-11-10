import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Button, ButtonProps } from './index'

describe('Button', () => {
  const defaultProps: ButtonProps = {
    label: 'Press me',
    onPress: jest.fn(),
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly with default props', () => {
    const { getByText } = render(<Button {...defaultProps} />)
    expect(getByText(defaultProps.label)).toBeDefined()
  })

  it('calls onPress when pressed', () => {
    const { getByText } = render(<Button {...defaultProps} />)
    fireEvent.press(getByText(defaultProps.label))
    expect(defaultProps.onPress).toHaveBeenCalled()
  })

  it('disables button when loading is true', () => {
    const { getByTestId } = render(<Button {...defaultProps} loading />)
    expect(getByTestId('button')).toBeDisabled()
  })

  it('displays activity indicator when loading is true', () => {
    const { getByTestId } = render(<Button {...defaultProps} loading />)
    expect(getByTestId('activity-indicator')).toBeDefined()
  })

  it('calls hapticSuccess when enableHaptics is true and outline is false', () => {
    const hapticSuccess = jest.fn()
    jest.mock('../../hooks/useHaptics', () => ({
      useHaptic: () => hapticSuccess,
    }))
    const { getByText } = render(<Button {...defaultProps} enableHaptics />)
    fireEvent.press(getByText(defaultProps.label))
    expect(hapticSuccess).toHaveBeenCalled()
  })

  it('calls hapticWarning when enableHaptics is true and outline is true', () => {
    const hapticWarning = jest.fn()
    jest.mock('../../hooks/useHaptics', () => ({
      useHaptic: () => hapticWarning,
    }))
    const { getByText } = render(<Button {...defaultProps} enableHaptics outline />)
    fireEvent.press(getByText(defaultProps.label))
    expect(hapticWarning).toHaveBeenCalled()
  })
})
