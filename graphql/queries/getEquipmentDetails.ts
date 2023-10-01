import { gql } from '~/__generated__/gql'

export const GET_EQUIPMENT_DETAILS = gql(/* GraphQL */ `
  query getEquipmentDetails($equipmentId: UUID!) {
    equipmentsCollection(filter: { id: { eq: $equipmentId } }) {
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
