import { gql } from '~/__generated__/gql'

export const GET_FILTERS = gql(`
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
                parentId
              }
            }
          }
        }
      }
    }
  }
`)
