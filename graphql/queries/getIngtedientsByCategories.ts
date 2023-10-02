import { gql } from '~/__generated__'

export const GET_INGREDIENTS_BY_CATEGORIES = gql(/* GraphQL */ `
  query getIngredientsByCategories {
    ingredientsByCategoriesCollection(first: 100) {
      edges {
        node {
          id
          title
          data
          count
        }
      }
    }
  }
`)
