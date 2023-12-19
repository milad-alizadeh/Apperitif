import { gql } from '~/__generated__/gql'

export const GET_MY_BAR = gql(`
  query getMyBar {
    myBarCollection(orderBy: { title: AscNullsLast }) {
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
