import { gql } from '~/__generated__/gql'

export const DELETE_FROM_FAVOURITES = gql(`
  mutation deleteFromFavourites($recipeId: UUID!, $profileId: UUID!) {
    deleteFromProfilesRecipesCollection(
      filter: { recipeId: { eq: $recipeId }, profileId: { eq: $profileId } }
      atMost: 1
    ) {
      records {
        recipeId
        profileId
      }
    }
  }
`)
