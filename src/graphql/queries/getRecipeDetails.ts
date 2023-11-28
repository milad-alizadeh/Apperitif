import { gql } from '~/__generated__/gql'

export const GET_RECIPE_DETAILS = gql(`
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
          recipesCategoriesCollection {
            edges {
              node {
                category {
                  id
                  parentId
                  name
                  imageUrl
                }
              }
            }
          }
          recipesIngredientsCollection(
            orderBy: { isOptional: AscNullsLast, quantity: DescNullsLast }
          ) {
            edges {
              node {
                isOptional
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
          stepsCollection(orderBy: { number: AscNullsFirst }) {
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
