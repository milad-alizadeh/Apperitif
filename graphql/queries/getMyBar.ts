import { gql } from '~/__generated__/gql'

export const GET_MY_BAR = gql(/* GraphQL */ `
  query getMyBar {
    profilesIngredientsCollection {
      edges {
        node {
          ingredient {
            id
            name
            ingredientsCategoriesCollection {
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
