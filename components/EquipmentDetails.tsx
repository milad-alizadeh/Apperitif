import { useQuery } from '@apollo/client'
import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { GET_EQUIPMENT_DETAILS } from '~/graphql/queries/'
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
  const { data } = useQuery(GET_EQUIPMENT_DETAILS, {
    variables: { equipmentId },
  })

  const equipment = data?.equipmentCollection.edges[0]?.node

  return (
    <ScrollView className="min-h-[200px] p-6 pt-6 flex-">
      <View className="justify-end flex-1">
        <View className="flex-1">
          <Image
            source={{ uri: equipment?.imageUrl }}
            resizeMode="contain"
            className="w-full h-60 rounded-xl mb-4"
          />

          <Text h2 weight="bold" styleClassName="mb-2">
            {equipment?.name}
          </Text>

          <Text body styleClassName="mb-1">
            {equipment?.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
