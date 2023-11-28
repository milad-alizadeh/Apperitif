import { gql } from '~/__generated__/gql'

export const ADD_TO_MY_BAR = gql(`
  mutation addToMyBar($records: [ProfilesIngredientsInsertInput!]!) {
    insertIntoProfilesIngredientsCollection(objects: $records) {
      records {
        ingredientId
        profileId
      }
    }
  }
`)
