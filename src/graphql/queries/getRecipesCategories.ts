import { gql } from '~/__generated__'

export const GET_RECIPES_CATEGORIES = gql(`
  query getRecipesCategories(
    $first: Int
    $last: Int
    $before: Cursor
    $after: Cursor
    $filter: RecipesCategoriesFilter
    $orderBy: [RecipesCategoriesOrderBy!]
  ) {
    recipesCategoriesCollection(
      filter: $filter
      first: $first
      last: $last
      after: $after
      before: $before
      orderBy: $orderBy
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          recipe {
            name
            id
            imageUrl
          }
        }
      }
    }
  }
`)
