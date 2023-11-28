import { gql } from '~/__generated__/gql'

export const GET_RECIPES_BY_INGREDIENT = gql(`
  query getRecipesByIngredient($ingredientId: UUID!) {
    recipesIngredientsCollection(filter: { ingredientId: { eq: $ingredientId } }, first: 10) {
      edges {
        node {
          ingredient {
            id
            name
          }
          recipe {
            id
            name
            description
            imageUrl
          }
        }
      }
    }
  }
`)
