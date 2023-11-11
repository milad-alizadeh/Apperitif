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
    expect(getByTestId('icon-image').props.source).toEqual(iconRegistry.arrowLeft)
  })

  describe('Prop Handling', () => {
    const sizes = ['xsmall', 'small', 'medium', 'large']
    sizes.forEach((size) => {
      it(`applies correct size for ${size} prop`, () => {
        const { getByTestId } = render(<Icon icon="arrowLeft" size={size} />)
        expect(getByTestId('icon-container').props.style).toContainEqual(styleClassNameBySize[size])
      })
    })

    it('applies correct color', () => {
      const color = 'red'
      const { getByTestId } = render(<Icon icon="arrowLeft" color={color} />)
      expect(getByTestId('icon-image').props.style).toContainEqual({ tintColor: color })
    })
  })

  describe('Conditional Rendering', () => {
    it('uses TouchableOpacity when onPress is provided', () => {
      const onPressMock = jest.fn()
      const { getByType } = render(<Icon icon="arrowLeft" onPress={onPressMock} />)
      expect(getByType(TouchableOpacity)).toBeTruthy()
    })

    it('uses View when onPress is not provided', () => {
      const { getByType } = render(<Icon icon="arrowLeft" />)
      expect(getByType(View)).toBeTruthy()
    })
  })

  describe('Interaction Testing', () => {
    it('calls onPress when icon is pressed', () => {
      const onPressMock = jest.fn()
      const { getByTestId } = render(<Icon icon="arrowLeft" onPress={onPressMock} />)
      fireEvent.press(getByTestId('icon-touchable'))
      expect(onPressMock).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('sets correct accessibilityRole when onPress is provided', () => {
      const { getByTestId } = render(<Icon icon="arrowLeft" onPress={() => {}} />)
      expect(getByTestId('icon-touchable').props.accessibilityRole).toEqual('imagebutton')
    })
  })

  describe('Icon Registry', () => {
    it('renders image from iconRegistry', () => {
      const { getByTestId } = render(<Icon icon="arrowLeft" />)
      expect(getByTestId('icon-image').props.source).toBe(iconRegistry['arrowLeft'])
    })
  })
})
