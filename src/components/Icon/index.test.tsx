import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon, iconRegistry } from '.'

// Adjust the import based on your file structure

describe('<Icon />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Icon icon="arrowLeft" />)
    expect(getByTestId('icon-image')).toBeTruthy()
  })

  it('renders the correct icon based on icon prop', () => {
    const { getByTestId } = render(<Icon icon="arrowLeft" />)
    expect(getByTestId('icon-image').props.source).toBeTruthy()
  })

  it('applies correct color', () => {
    const color = 'red'
    const { getByTestId } = render(<Icon icon="arrowLeft" color={color} />)
    expect(getByTestId('icon-image')).toHaveStyle({ tintColor: color })
  })

  it(`applies correct size prop`, () => {
    const { getByTestId } = render(<Icon icon="arrowLeft" size={'large'} />)
    expect(getByTestId('icon-container')).toHaveStyle({ width: 40, height: 40 })
  })

  describe('Interaction Testing', () => {
    it('calls onPress when icon is pressed', () => {
      const onPressMock = jest.fn()
      const { getByTestId } = render(<Icon icon="arrowLeft" onPress={onPressMock} />)
      fireEvent.press(getByTestId('icon-container'))
      expect(onPressMock).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('sets correct accessibilityRole when onPress is provided', () => {
      const { getByTestId } = render(<Icon icon="arrowLeft" onPress={() => {}} />)
      expect(getByTestId('icon-container').props.accessibilityRole).toEqual('imagebutton')
    })
  })
})
