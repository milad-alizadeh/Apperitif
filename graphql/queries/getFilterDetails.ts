import { gql } from '~/__generated__/gql'

export const GET_FILTER_DETAILS = gql(/* GraphQL */ `
  query getFilterDetails($filterId: UUID!) {
    categoriesCollection(filter: { id: { eq: $filterId } }) {
      edges {
        node {
          id
          name
          categoriesCollection {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`)
