import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { SectionHeader } from '.'

// Adjust the import path as needed

describe('SectionHeader', () => {
  const sectionTitles = ['Section 1', 'Section 2', 'Section 3']
  const setActiveIndex = jest.fn()

  it('renders correctly', () => {
    const { getByText } = render(
      <SectionHeader
        sectionTitles={sectionTitles}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
      />,
    )

    sectionTitles.forEach((title) => {
      expect(getByText(title)).toBeTruthy()
    })
  })

  it('updates active index on press', () => {
    const { getByText } = render(
      <SectionHeader
        sectionTitles={sectionTitles}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
      />,
    )

    fireEvent.press(getByText('Section 2'))
    expect(setActiveIndex).toHaveBeenCalledWith(1)
  })

  it('renders custom style class name', () => {
    const { getByTestId } = render(
      <SectionHeader
        sectionTitles={sectionTitles}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
        styleClassName="bg-red-500"
      />,
    )

    expect(getByTestId('section-header')).toHaveStyle({ backgroundColor: '#ef4444' })
  })

  it('scroll to sectionListRef on press', () => {
    const sectionListRef = {
      current: {
        getItemOffset: jest.fn(() => 0),
        scrollToOffset: jest.fn(),
      },
    }

    const { getByText } = render(
      <SectionHeader
        sectionTitles={sectionTitles}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
        sectionListRef={sectionListRef}
      />,
    )

    fireEvent.press(getByText('Section 2'))
    expect(sectionListRef.current?.getItemOffset).toHaveBeenCalled()
    expect(sectionListRef.current?.scrollToOffset).toHaveBeenCalled()
  })
})
