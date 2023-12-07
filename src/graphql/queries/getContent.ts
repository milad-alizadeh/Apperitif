import { gql } from '~/__generated__/gql'

export const GET_CONTENT = gql(`
  query getContent {
    appContentCollection {
      edges {
        node {
          id
          name
          content
        }
      }
    }
  }
`)
