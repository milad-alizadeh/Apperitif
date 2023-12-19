import { useQuery } from '@apollo/client'
import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { GET_EQUIPMENT_DETAILS } from '~/graphql/queries/'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'
import { useSafeAreaInsetsStyle } from '~/utils/useSafeAreaInsetsStyle'
import { Text } from './Text'

/**
 * Props for the EquipmentDetails component
 */
export interface EquipmentDetailsProps {
  /** The ID of the ingredient to display details for */
  equipmentId: string
}

/**
 * A component that displays details for a specific ingredient
 */
export const EquipmentDetails = function EquipmentDetails({ equipmentId }: EquipmentDetailsProps) {
  const { data, loading } = useQuery(GET_EQUIPMENT_DETAILS, {
    variables: { equipmentId },
  })
  const inset = useSafeAreaInsetsStyle(['bottom'], 'margin')
  const equipment = data?.equipmentCollection.edges[0]?.node

  return (
    <>
      {!loading && data && (
        <ScrollView className="px-6 pt-6 pb-3" style={inset}>
          <View className="justify-end flex-1">
            <View className="flex-1">
              <Image
                source={{ uri: getImageUrl(equipment?.imageUrl, imageSizes.THUMBNAIL) }}
                contentFit="contain"
                transition={300}
                className="w-full h-60 rounded-xl mb-4"
              />

              <Text testID="equipment-name" h2 weight="bold" styleClassName="mb-2">
                {equipment?.name}
              </Text>

              <Text body testID="equipment-description" styleClassName="mb-1">
                {equipment?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  )
}
