import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { SectionHeaderItem } from '.'

describe('SectionHeaderItem', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(<SectionHeaderItem label="Section 1" />)
    expect(getByText('Section 1')).toBeTruthy()
  })

  it('it fires the onPress event', () => {
    const onPress = jest.fn()
    const { getByText } = render(<SectionHeaderItem label="Section 1" onPress={onPress} />)
    fireEvent.press(getByText('Section 1'))
    expect(onPress).toHaveBeenCalled()
  })
})
