import { gql } from '~/__generated__/gql'

export const GET_MEASUREMENTS = gql(/* GraphQL */ `
  query getMeasurements {
    selectedUnitSystem @client
    selectedJiggerSize @client
    doubleRecipe @client
    partialMatchInfoBoxDismissed @client
    totalMatchInfoBoxDismissed @client
  }
`)
