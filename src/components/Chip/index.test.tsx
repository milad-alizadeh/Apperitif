import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Chip } from './index'

describe('Chip', () => {
  it('renders label text', () => {
    const { getByText } = render(<Chip label="Test Label" />)
    expect(getByText('Test Label')).toBeDefined()
  })

  it('calls onDismiss when close icon is pressed', () => {
    const onDismiss = jest.fn()
    const { getByTestId } = render(<Chip label="Test Label" onDismiss={onDismiss} />)
    fireEvent.press(getByTestId('close-icon'))
    expect(onDismiss).toHaveBeenCalled()
  })

  it('renders correctly with styleClassName prop', () => {
    const { getByTestId } = render(<Chip label="Test Label" styleClassName="bg-red-500" />)
    expect(getByTestId('chip')).toHaveStyle({ backgroundColor: '#ef4444' })
  })
})
