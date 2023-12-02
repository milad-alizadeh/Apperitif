import { gql } from '~/__generated__/gql'

export const GET_LOCAL_STATE = gql(`
  query getLocalState {
    selectedUnitSystem @client
    selectedJiggerSize @client
    doubleRecipe @client
    partialMatchInfoBoxDismissed @client
    totalMatchInfoBoxDismissed @client
    myBarPopoverDismissed @client
  }
`)
