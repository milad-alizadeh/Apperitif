import { useQuery } from '@apollo/client'
import { router } from 'expo-router'
import groupBy from 'lodash/groupBy'
import values from 'lodash/values'
import React from 'react'
import * as Sentry from 'sentry-expo'
import { GetCategoriesQuery } from '~/__generated__/graphql'
import {
  Button,
  CardProps,
  Header,
  HorizontalList,
  Icon,
  Screen,
  Text,
  VerticalList,
} from '~/components'
import { GET_CATEGORIES, GET_CONTENT } from '~/graphql/queries'
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
  // Fetch browser content
  const { data: browseData, error: browseError } = useQuery(GET_CONTENT, {
    variables: { name: 'home' },
  })

  let categoryIds: string[] = []

  try {
    if (browseData) {
      const content = browseData.appContentCollection?.edges?.[0]?.node?.content
      if (content) {
        const parsedContent = JSON.parse(content)
        if (parsedContent.categories) {
          categoryIds = values(parsedContent.categories)
        }
      }
    }
  } catch (error) {
    throw new Error('Error parsing categories', error)
  }

  // Fetch categories
  const { data: categoriesData, error } = useQuery(GET_CATEGORIES, {
    variables: { ids: categoryIds },
    skip: !categoryIds.length,
  })

  const getListProps = (
    edge: GetCategoriesQuery['categoriesCollection']['edges'][number],
  ): ListType => {
    const recipes = edge.node.recipesCategoriesCollection.edges.map(
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
            pathname: '/recipe/[recipeId]',
            params: { recipeId: id },
          })
        },
      }),
    )

    const subCategories = edge.node.categoriesCollection.edges.map(
      ({ node: { name, id, imageUrl } }) => ({
        name,
        id,
        onPress: () =>
          router.push({
            pathname: '/browse/recipes',
            params: { categoryIds: [id] },
          }),
        imageUrl,
      }),
    )
    const title = edge.node.name
    const listItems = subCategories.length ? subCategories : recipes
    return { listItems, title, id: edge.node.id }
  }

  const handleError = () => {
    Sentry.Native.captureException('Sample Error for Sentry.io')
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

  return (
    <Screen preset="scroll" safeAreaEdges={['top']} KeyboardAvoidingViewProps={{ enabled: false }}>
      <Header
        title="Browse"
        rightElement={
          <Icon
            icon="search"
            onPress={() =>
              router.push({ pathname: '/browse/recipes', params: { categoryIds: [''] } })
            }
            size="large"
            color={colors.neutral[800]}
          />
        }
      />

      <Button label="Test Error" onPress={handleError} />

      {!!error || (!!browseError && <Text>{error?.message || browseError?.message}</Text>)}
      {orderedCategories.map(({ listItems, title, id }, index) =>
        index !== 3 ? (
          <HorizontalList
            key={id}
            listItems={listItems}
            title={title}
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
