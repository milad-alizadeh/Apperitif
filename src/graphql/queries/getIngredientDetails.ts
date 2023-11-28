import { gql } from '~/__generated__/gql'

export const GET_INGREDIENT_DETAILS = gql(`
  query getIngredientDetails($ingredientId: UUID!) {
    ingredientsCollection(filter: { id: { eq: $ingredientId } }) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`)
