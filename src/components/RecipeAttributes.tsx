import { Image } from 'expo-image'
import React, { FC } from 'react'
import { View } from 'react-native'
import { Text } from './Text'

export interface RecipeAttributesProps {
  /**
   * An optional style override useful for padding & margin.
   */
  attributes: {
    name: string
    id: any
    imageUrl: string
  }[]
}

/**
 * Renders a list of recipe attributes.
 * @param {Object} props - The component props.
 * @param {Array} props.attributes - The array of recipe attributes.
 * @returns {JSX.Element} - The JSX element for the RecipeAttributes component.
 */

export const RecipeAttributes: FC<RecipeAttributesProps> = ({
  attributes,
}: RecipeAttributesProps) => {
  return (
    !!attributes.length && (
      <View className="flex-row w-full justify-between">
        {attributes.map((attribute) => {
          if (!attribute) return null
          return (
            <View key={attribute?.id} className="flex-row items-center">
              <Image
                className="w-8 h-8 mr-1"
                contentFit="contain"
                source={{ uri: attribute?.imageUrl }}
              />
              <Text styleClassName="text-sm font-medium">{attribute.name}</Text>
            </View>
          )
        })}
      </View>
    )
  )
}
