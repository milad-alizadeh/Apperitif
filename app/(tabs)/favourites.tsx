import { useMutation, useQuery } from '@apollo/client'
import { router } from 'expo-router'
import React from 'react'
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
  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={$containerStyle}>
      <FlatList
        className="flex-1"
        data={flatListData}
        ListHeaderComponent={
          <View className="mb-6">
            <Header title="Favourites" />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text styleClassName="text-center">{error.message}</Text>
          ) : (
            <Text styleClassName="text-center">No favourites yet</Text>
          )
        }
        renderItem={({ item }) => (
          <ListItem
            leftImage={getImageUrl(item.imageUrl, imageSizes.THUMBNAIL)}
            rightIcon="trash"
            name={item.name}
            styleClassName="mx-6"
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
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  )
}

const $containerStyle: ViewStyle = {
  flex: 1,
}
