import { useMutation, useQuery } from '@apollo/client'
import { Link, router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { FlatList, View, ViewStyle } from 'react-native'
import { Header, ListItem, Screen, Text } from '~/components'
import { DELETE_FROM_FAVOURITES } from '~/graphql/mutations'
import { GET_FAVOURITES } from '~/graphql/queries'
import { useAnalytics, useSession } from '~/hooks'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'

export default function FavouritesScreen() {
  const { capture } = useAnalytics()
  const { user } = useSession()
  const { data, loading, error, refetch } = useQuery(GET_FAVOURITES)
  const [deleteingItemId, setDeleteingItemId] = useState<string>('')

  const flatListData = data?.profilesRecipesCollection.edges.map((e) => e.node.recipe)

  const [deleteFromFavourites] = useMutation(DELETE_FROM_FAVOURITES)

  const renderItem = useCallback(
    ({ item }) => {
      if (!item?.imageUrl) return null
      return (
        <ListItem
          leftImage={getImageUrl(item.imageUrl, imageSizes.THUMBNAIL)}
          rightIcon="trash"
          name={item.name}
          styleClassName="mx-6 mb-3"
          testID="favourite-recipe"
          testIDIconRight="favourite-recipe-delete"
          card
          loading={deleteingItemId === item.id}
          onPress={() => {
            capture('favourites:recipe_press', {
              recipe_name: item.name,
            })
            router.push({
              pathname: '/recipe',
              params: { recipeId: item.id, recipeName: item.name },
            })
          }}
          onRightIconPress={() => {
            setDeleteingItemId(item.id)

            capture('favourites:recipe_remove', {
              recipe_name: item.name,
            })

            deleteFromFavourites({
              variables: { recipeId: item.id, profileId: user?.id },
              onError: () => {
                refetch()
              },
              onCompleted: () => {
                refetch()
                setDeleteingItemId('')
              },
            })
          }}
        />
      )
    },
    [data, deleteingItemId, setDeleteingItemId],
  )

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={$containerStyle}>
      {/* Empty state if there are no recipes in the bar */}
      {!data?.profilesRecipesCollection?.edges.length && !loading ? (
        <View
          testID="empty-favourites"
          className="w-full px-20 flex-1 justify-center items-center m-auto"
        >
          <Text h3 styleClassName="text-center mb-3">
            Your favorites list is on a detox!
          </Text>
          <Link
            href="/browse"
            onPress={() => {
              capture('favourites:add_recipes_press')
            }}
            className="text-primary underline text-base font-bold"
          >
            Add some recipes
          </Link>
        </View>
      ) : (
        <FlatList
          className="flex-1"
          data={flatListData}
          refreshing={loading && flatListData?.length > 0}
          ListHeaderComponent={<Header title="Favourites" />}
          onRefresh={() => refetch()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flex: 1,
}
