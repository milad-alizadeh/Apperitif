import { gql } from '~/__generated__/gql'

export const GET_CATEGORY_DETAILS = gql(`
  query getCategoryDetails($categoryId: UUID!) {
    categoriesCollection(filter: { id: { eq: $categoryId } }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`)
