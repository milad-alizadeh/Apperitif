import { gql } from 'app/__generated__/gql'

export const GET_RECIPE_DETAILS = gql(/* GraphQL */ `
  query getRecipeDetails($recipeId: UUID!) {
    recipesCollection(filter: { id: { eq: $recipeId } }) {
      edges {
        node {
          id
          name
          description
          imageUrl
          profilesRecipesCollection {
            edges {
              node {
                profileId
              }
            }
          }
          recipesIngredientsCollection {
            edges {
              node {
                quantity
                unit {
                  id
                  name
                }
                ingredient {
                  id
                  name
                }
              }
            }
          }
          stepsCollection {
            edges {
              node {
                id
                number
                description
              }
            }
          }
        }
      }
    }
  }
`)
