import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import colors from '~/theme/colors'
import groupBy from 'lodash/groupBy'
import values from 'lodash/values'
import React, { FC } from 'react'
import { View } from 'react-native'

import { GetCategoriesQuery } from '~/__generated__/graphql'
import { CardProps, Header, HorizontalList, Icon, Screen, Text, VerticalList } from '~/components'
import { GET_CATEGORIES, GET_CONTENT } from '~/graphql/queries'
import mapRecipes from '~/utils/mapRecipes'

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

  const categoryIds = browseData
    ? values(
        JSON.parse(browseData.contentApperitivoCollection?.edges[0]?.node.content).categories ?? {},
      )
    : []

  // Fetch categories
  const { data: categoriesData, error } = useQuery(GET_CATEGORIES, {
    variables: { ids: categoryIds },
    skip: !categoryIds.length,
  })

  const navigation = useNavigation()

  const getListProps = (
    edge: GetCategoriesQuery['categoriesCollection']['edges'][number],
  ): ListType => {
    const recipes = edge.node.recipesCategoriesCollection.edges.map((edge) =>
      mapRecipes(edge, navigation),
    )

    const subCategories = edge.node.categoriesCollection.edges.map(
      ({ node: { name, id, imageUrl } }) => ({
        name,
        id,
        onPress: () => navigation.navigate('FilteredRecipes', { categoryId: id }),
        imageUrl,
      }),
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
    const categories = queryData.categoriesCollection.edges
    const categoriesById = groupBy(categories, 'node.id')
    return categoryIds.map((id) => getListProps(categoriesById[id][0]))
  }

  const orderedCategories = getBrowseCategories(categoriesData, categoryIds)

  return (
    <Screen preset="scroll" safeAreaEdges={['top']} KeyboardAvoidingViewProps={{ enabled: false }}>
      <View className="flex-row space-between flex-1 mb-4">
        <Header title="Browse" />

        <Icon
          icon="search"
          onPress={() => navigation.navigate('FilteredRecipes', { categoryId: '' })}
          size="large"
          containerClassName="absolute right-5 top-0"
          color={colors.neutral[800]}
        />
      </View>

      {!!error || (!!browseError && <Text>{error?.message || browseError?.message}</Text>)}
      {orderedCategories.map(({ listItems, title, id }, index) =>
        index !== 3 ? (
          <HorizontalList
            key={id}
            listItems={listItems}
            title={title}
            wide={index === 1}
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
