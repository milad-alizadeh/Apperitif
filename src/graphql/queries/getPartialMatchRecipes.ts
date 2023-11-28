import { gql } from '~/__generated__/gql'

export const GET_PARTIAL_MATCH_RECIPES = gql(`
  query getPartialMatchRecipes {
    availableRecipesForProfilesCollection(
      filter: { canAlmostMake: { eq: true }, isTotalMatch: { eq: false } }
    ) {
      edges {
        node {
          profileId
          recipeName
          isTotalMatch
          recipeId
          recipeImageUrl
          missingIngredients
          canAlmostMake
          totalRequiredCount
        }
      }
    }
  }
`)
