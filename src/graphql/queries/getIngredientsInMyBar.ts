import { gql } from '~/__generated__/gql'

export const GET_INGREDIENTS_IN_MY_BAR = gql(`
  query getIngredientsInMyBar {
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
