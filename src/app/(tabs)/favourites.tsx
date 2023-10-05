import { useMutation, useQuery } from '@apollo/client'
import { Link, router } from 'expo-router'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, View, ViewStyle } from 'react-native'
import { Header, ListItem, Screen, Text } from '~/components'
import { DELETE_FROM_FAVOURITES } from '~/graphql/mutations/deleteFromFavourites'
import { GET_FAVOURITES } from '~/graphql/queries/getFavourites'
import { useSession } from '~/hooks/useSession'
import { getImageUrl, imageSizes } from '~/utils/getImageUrl'

export default function FavouritesScreen() {
  const { user } = useSession()
  const { data, loading, error, refetch } = useQuery(GET_FAVOURITES)

  const flatListData = data?.profilesRecipesCollection.edges.map((e) => e.node.recipe)

  const [deleteFromFavourites] = useMutation(DELETE_FROM_FAVOURITES, {
    onError: () => {
      refetch()
    },
    onCompleted: () => {
      refetch()
    },
  })

  const renderItem = useCallback(
    ({ item }) => {
      if (!item?.imageUrl) return null
      return (
        <ListItem
          leftImage={getImageUrl(item.imageUrl, imageSizes.THUMBNAIL)}
          rightIcon="trash"
          name={item.name}
          styleClassName="mx-6 mb-3"
          card
          onPress={() =>
            router.push({ pathname: '/recipe/[recipeId]', params: { recipeId: item.id } })
          }
          onRightIconPress={() =>
            deleteFromFavourites({
              variables: { recipeId: item.id, profileId: user?.id },
              onError: () => refetch(),
            })
          }
        />
      )
    },
    [data],
  )

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={$containerStyle}>
      <Header title="Favourites" />
      {/* Empty state if there are no recipes in the bar */}
      {!data?.profilesRecipesCollection?.edges.length ? (
        <View className="w-full px-20 flex-1 justify-center items-center m-auto">
          <Text h3 styleClassName="text-center mb-3">
            Your favorites list is on a detox!
          </Text>
          <Link href="/browse" className="text-primary underline text-base font-bold">
            Add some recipes
          </Link>
        </View>
      ) : (
        <FlatList
          className="flex-1 h-full"
          data={flatListData}
          refreshing={loading}
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
