import { gql } from '~/__generated__'

export const GET_INGREDIENTS_CATEGORIES = gql(/* GraphQL */ `
  query getIngredientsCategories {
    categoriesCollection {
      edges {
        node {
          id
          name
          ingredientsCategoriesCollection {
            edges {
              node {
                ingredient {
                  id
                  name
                  profilesIngredientsCollection {
                    edges {
                      node {
                        profile {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)
