import { gql } from '~/__generated__/gql'

export const GET_EQUIPMENT_DETAILS = gql(`
  query getEquipmentDetails($equipmentId: UUID!) {
    equipmentCollection(filter: { id: { eq: $equipmentId } }) {
      edges {
        node {
          id
          name
          description
          imageUrl
        }
      }
    }
  }
`)
