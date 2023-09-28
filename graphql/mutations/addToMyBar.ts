import { gql } from 'app/__generated__/gql'

export const ADD_TO_MY_BAR = gql(/* GraphQL */ `
  mutation addToMyBar($records: [ProfilesIngredientsInsertInput!]!) {
    insertIntoProfilesIngredientsCollection(objects: $records) {
      records {
        ingredientId
        profileId
      }
    }
  }
`)
