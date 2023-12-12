import { useQuery } from '@apollo/client'
import { router } from 'expo-router'
import groupBy from 'lodash/groupBy'
import orderBy from 'lodash/orderBy'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { View } from 'react-native'
import { GetCategoriesQuery } from '~/__generated__/graphql'
import {
  CardProps,
  Header,
  HorizontalList,
  Icon,
  InfoBox,
  Screen,
  VerticalList,
} from '~/components'
import { GET_CATEGORIES } from '~/graphql/queries'
import { useAnalytics } from '~/hooks/useAnalytics'
import { useAppContent } from '~/providers/AppContentProvider'
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
  const { home } = useAppContent()

  const { colorScheme } = useColorScheme()

  const backgroundColor = colorScheme === 'dark' ? colors.neutral[800] : colors.white

  const categoryIds = home?.category_ids ?? []

  // Fetch categories
  const { data: categoriesData, error } = useQuery(GET_CATEGORIES, {
    variables: { ids: categoryIds },
    skip: !categoryIds.length,
    fetchPolicy: 'cache-and-network',
  })

  const getListProps = (
    edge: GetCategoriesQuery['categoriesCollection']['edges'][number],
  ): ListType => {
    if (!edge) return { listItems: [], title: '', id: '' }
    const recipes = orderBy(
      edge.node.recipesCategoriesCollection.edges
        .filter((e) => e.node.recipe)
        .map(
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

          capture('browse:home_filter_press', { filter_name: name })
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
    const categories = queryData.categoriesCollection?.edges ?? []
    const categoriesById = groupBy(categories, 'node.id')
    return categoryIds.map((id) => getListProps(categoriesById?.[id]?.[0])) ?? []
  }

  const orderedCategories = getBrowseCategories(categoriesData, categoryIds)

  return (
    <Screen
      preset="scroll"
      backgroundColor={backgroundColor}
      safeAreaEdges={['top']}
      KeyboardAvoidingViewProps={{ enabled: false }}
    >
      {!!error && (
        <View className="p-6">
          <InfoBox type="error" description={error?.message} />
        </View>
      )}
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
