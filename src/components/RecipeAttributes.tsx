import { Image } from 'expo-image'
import React, { FC } from 'react'
import { View } from 'react-native'
import { SkeletonView } from './SkeletonView'
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
    <View className="flex-row w-full">
      {attributes.map((attribute) => {
        return (
          <View key={attribute?.id} className="w-1/3">
            <View className="flex-row items-center  justify-center">
              {!loading && (
                <Image
                  className="w-10 h-10 mr-1"
                  contentFit="contain"
                  source={{ uri: attribute?.imageUrl }}
                />
              )}

              <Text
                loading={loading}
                skeletonWidth={48}
                styleClassName="text-sm font-medium max-w-[100px]"
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
