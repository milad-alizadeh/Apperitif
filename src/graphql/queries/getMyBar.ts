import { gql } from '~/__generated__/gql'

export const GET_MY_BAR = gql(/* GraphQL */ `
  query getMyBar {
    profilesIngredientsCollection(first: 1000) {
      edges {
        node {
          ingredient {
            id
            name
            ingredientsCategoriesCollection(first: 1000) {
              edges {
                node {
                  category {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)
