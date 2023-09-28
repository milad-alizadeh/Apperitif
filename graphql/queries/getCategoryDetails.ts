import { gql } from 'app/__generated__/gql'

export const GET_CATEGORY_DETAILS = gql(/* GraphQL */ `
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
