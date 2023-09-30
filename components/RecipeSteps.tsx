import * as React from 'react'
import { View } from 'react-native'
import { Text } from './Text'

export interface RecipeStepsProps {
  steps: {
    id?: string
    number?: number
    description?: string
  }[]
}

/**
 * Describe your component here
 */
export const RecipeSteps = function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <View>
      {steps.map(({ id, number, description }) => (
        <View key={id} className="mb-2 flex flex-row pr-5">
          <Text weight="bold" body>
            {number?.toString()}.{' '}
          </Text>
          <Text body>{description}</Text>
        </View>
      ))}
    </View>
  )
}
