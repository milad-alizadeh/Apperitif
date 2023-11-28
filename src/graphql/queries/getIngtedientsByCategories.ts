import { gql } from '~/__generated__'

export const GET_INGREDIENTS_BY_CATEGORIES = gql(`
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
