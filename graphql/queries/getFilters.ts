import { gql } from 'app/__generated__/gql'

export const GET_FILTERS = gql(/* GraphQL */ `
  query getFilters($ids: [UUID!]) {
    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {
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
