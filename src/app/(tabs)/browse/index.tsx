import { useQuery } from '@apollo/client'
import { router } from 'expo-router'
import groupBy from 'lodash/groupBy'
import orderBy from 'lodash/orderBy'
import React from 'react'
import { GetCategoriesQuery } from '~/__generated__/graphql'
import { CardProps, Header, HorizontalList, Icon, Screen, Text, VerticalList } from '~/components'
import { GET_CATEGORIES } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useStore } from '~/providers'
import { colors } from '~/theme/colors'

interface ListType {
  listItems: CardProps[]
  title: string
  id: string
}
/**
 * BrowseHomeScreen component displays a list of categories and subcategories.
 */
export default function BrowseHomeScreen() {
  const { capture } = useAnalytics()
  const { appContent } = useStore()

  const categoryIds = appContent?.home?.category_ids ?? []

  // Fetch categories
  const { data: categoriesData, error } = useQuery(GET_CATEGORIES, {
    variables: { ids: categoryIds },
    skip: !categoryIds.length,
    fetchPolicy: 'cache-and-network',
  })

  const getListProps = (
    edge: GetCategoriesQuery['categoriesCollection']['edges'][number],
  ): ListType => {
    const recipes = orderBy(
      edge.node.recipesCategoriesCollection.edges.map(
        ({
          node: {
            recipe: { name, id, imageUrl },
          },
        }) => ({
          name,
          id,
          imageUrl,
          onPress: () => {
            router.push({
              pathname: '/recipe',
              params: { recipeId: id, recipeName: name },
            })

            capture('browse:home_recipe_press', { recipe_name: name })
          },
        }),
      ),
      ['name', 'asc'],
    )

    const subCategories = orderBy(
      edge.node.categoriesCollection.edges.map(({ node: { name, id, imageUrl } }) => ({
        name,
        id,
        onPress: () => {
          router.push({
            pathname: '/browse/recipes',
            params: { categoryIds: [id], categoryName: name },
          })

          capture('browse:filter_press', { filter_name: name })
        },
        imageUrl,
      })),
      ['name', 'asc'],
    )
    const title = edge.node.name
    const listItems = subCategories.length ? subCategories : recipes
    return { listItems, title, id: edge.node.id }
  }

  // match the order of categroriesData with categoryIds
  const getBrowseCategories = (
    queryData: GetCategoriesQuery,
    categoryIds: string[],
  ): ListType[] => {
    if (!queryData) return []
    const categories = queryData.categoriesCollection?.edges
    const categoriesById = groupBy(categories, 'node.id')
    return categoryIds.map((id) => getListProps(categoriesById[id][0]))
  }

  const orderedCategories = getBrowseCategories(categoriesData, categoryIds)

  {
    !!error && <Text>{error?.message}</Text>
  }

  return (
    <Screen preset="scroll" safeAreaEdges={['top']} KeyboardAvoidingViewProps={{ enabled: false }}>
      <Header
        title="Browse"
        rightElement={
          <Icon
            icon="search"
            onPress={() => {
              router.push({
                pathname: '/browse/recipes',
                params: { categoryIds: [''], categoryName: '' },
              })

              capture('browse:search_press')
            }}
            size="large"
            color={colors.neutral[800]}
          />
        }
      />

      {orderedCategories.map(({ listItems, title, id }, index) =>
        index !== 3 ? (
          <HorizontalList
            key={id}
            listItems={listItems}
            title={title}
            testIDItem={index === 0 ? 'recipe-card' : 'category-card'}
            wide={index === 1}
            center={index === 2}
            showCount={false}
            styleClassName="mb-8"
          />
        ) : (
          <VerticalList
            styleClassName="px-6"
            key={id}
            listItems={listItems}
            title={title}
            numColumns={2}
            showCount={false}
          />
        ),
      )}
    </Screen>
  )
}
