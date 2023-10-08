import { gql } from '~/__generated__/gql'

export const GET_CAN_ALMOST_MAKE_RECIPES = gql(/* GraphQL */ `
  query getCanAlmostMakeRecipes {
    availableRecipesForProfilesCollection(
      filter: {
        canAlmostMake: {eq: true}, 
        isTotalMatch: {eq: false}
      }
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
`)
