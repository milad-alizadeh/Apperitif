import { gql } from 'app/__generated__/gql'

export const GET_FAVOURITES = gql(/* GraphQL */ `
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
