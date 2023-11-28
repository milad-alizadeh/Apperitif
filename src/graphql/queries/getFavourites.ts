import { gql } from '~/__generated__/gql'

export const GET_FAVOURITES = gql(`
  query getFavourites {
    profilesRecipesCollection {
      edges {
        node {
          recipe {
            id
            name
            imageUrl
          }
        }
      }
    }
  }
`)
