import { gql } from '~/__generated__/gql'

export const GET_CONTENT = gql(/* GraphQL */ `
  query getContent($name: String) {
    appContentCollection(filter: { name: { eq: $name } }) {
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