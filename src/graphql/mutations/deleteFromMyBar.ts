import { gql } from '~/__generated__/gql'

export const DELETE_FROM_MY_BAR = gql(`
  mutation deleteFromMyBar($ingredientIds: [UUID!], $profileIds: [UUID!]) {
    deleteFromProfilesIngredientsCollection(
      filter: { ingredientId: { in: $ingredientIds }, profileId: { in: $profileIds } }
      atMost: 500
    ) {
      records {
        ingredientId
        profileId
      }
    }
  }
`)
