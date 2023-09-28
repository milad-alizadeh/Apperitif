import { gql } from 'app/__generated__/gql'

export const GET_CATEGORIES = gql(/* GraphQL */ `
  query getCategories($ids: [UUID!]) {
    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {
      edges {
        node {
          id
          name
          imageUrl
          categoriesCollection {
            edges {
              node {
                id
                name
                imageUrl
              }
            }
          }
          recipesCategoriesCollection {
            edges {
              node {
                recipe {
                  id
                  name
                  imageUrl
                }
              }
            }
          }
        }
      }
    }
  }
`)
