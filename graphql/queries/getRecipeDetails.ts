import { gql } from '~/__generated__/gql'

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
                  plural
                  abbreviation
                  type
                  system
                  isConvertable
                  baseUnitId
                  systemToSystemConversionFactor
                  baseConversionFactor
                }
                ingredient {
                  id
                  name
                }
              }
            }
          }
          recipesEquipmentCollection {
            edges {
              node {
                equipment {
                  id
                  name
                  imageUrl
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
