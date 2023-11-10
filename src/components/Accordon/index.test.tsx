import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Accordion, AccordionItem } from '.'

describe('AccordionItem', () => {
  const mockToggleExpand = jest.fn()
  const title = 'Test Title'
  const description = 'Test Description'

  it('renders correctly', () => {
    const { getByText } = render(
      <AccordionItem
        title={title}
        description={description}
        isExpanded={false}
        toggleExpand={mockToggleExpand}
      />,
    )
    expect(getByText(title)).toBeTruthy()
    expect(getByText(description)).toBeTruthy()
  })

  it('render multiple AccordionItem', () => {
    const { getByText } = render(
      <Accordion
        content={[
          {
            title: 'Test Title 1',
            description: 'Test Description 1',
          },
          {
            title: 'Test Title 2',
            description: 'Test Description 2',
          },
        ]}
      />,
    )
    expect(getByText('Test Title 1')).toBeTruthy()
    expect(getByText('Test Description 1')).toBeTruthy()
    expect(getByText('Test Title 2')).toBeTruthy()
    expect(getByText('Test Description 2')).toBeTruthy()
  })

  it('it fires toggleExpand when clicked', () => {
    const { getByTestId } = render(
      <AccordionItem
        title={title}
        description={description}
        isExpanded={false}
        toggleExpand={mockToggleExpand}
      />,
    )
    fireEvent.press(getByTestId(`accordion-content-${title}`))
    expect(mockToggleExpand).toHaveBeenCalled()
  })
})
