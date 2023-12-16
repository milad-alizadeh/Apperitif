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
  loading?: boolean
}

/**
 * Renders a list of recipe attributes.
 * @param {Object} props - The component props.
 * @param {Array} props.attributes - The array of recipe attributes.
 * @returns {JSX.Element} - The JSX element for the RecipeAttributes component.
 */

export const RecipeAttributes: FC<RecipeAttributesProps> = ({
  attributes,
  loading,
}: RecipeAttributesProps) => {
  return (
    <View className="flex-row justify-between">
      {attributes.map((attribute) => {
        return (
          <View key={attribute?.id}>
            <View className="flex-row items-center justify-center" ac>
              {!loading && (
                <Image
                  className="w-9 h-9 mr-1"
                  contentFit="contain"
                  source={{ uri: attribute?.imageUrl }}
                />
              )}

              <Text
                loading={loading}
                small
                weight="medium"
                skeletonWidth={48}
                testID="recipe-attribute-name"
                styleClassName="max-w-[100px]"
              >
                {attribute?.name}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
