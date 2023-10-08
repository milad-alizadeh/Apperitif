import { gql } from '~/__generated__/gql'

export const GET_TOTAL_MATCH_RECIPES = gql(/* GraphQL */ `
  query getTotalmatchRecipes {
    availableRecipesForProfilesCollection(filter: { isTotalMatch: { eq: true } }) {
      edges {
        node {
          profileId
          recipeName
          recipeId
          recipeImageUrl
          isTotalMatch
          missingIngredients
          canAlmostMake
          totalRequiredCount
        }
      }
    }
  }
`)
