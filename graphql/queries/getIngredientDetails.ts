import { gql } from 'app/__generated__/gql'

export const GET_INGREDIENT_DETAILS = gql(/* GraphQL */ `
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
