import { gql } from '~/__generated__/gql'

export const ADD_TO_FAVOURITES = gql(`
  mutation addToFavourites($recipeId: UUID!, $profileId: UUID!) {
    insertIntoProfilesRecipesCollection(objects: [{ recipeId: $recipeId, profileId: $profileId }]) {
      records {
        recipeId
        profileId
      }
    }
  }
`)
