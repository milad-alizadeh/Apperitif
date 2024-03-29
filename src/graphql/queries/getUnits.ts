import { gql } from '~/__generated__/gql'

export const GET_UNITS = gql(`
  query getUnits {
    unitsCollection {
      edges {
        node {
          id
          name
          plural
          abbreviation
          type
          system
          isConvertable
          baseUnitId
          systemToSystemConversionFactor
          baseConversionFactor
        }
      }
    }
  }
`)
