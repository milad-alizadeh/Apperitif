import { GetRecipesCategoriesQuery } from '~/__generated__/graphql'

export default (
  {
    node: {
      recipe: { name, id, imageUrl },
    },
  }: GetRecipesCategoriesQuery['recipesCategoriesCollection']['edges'][number],
  navigation: { navigate: (arg0: string, arg1: { recipeId: string }) => void },
) => {
  return {
    name,
    id,
    imageUrl,
    onPress: () => {
      navigation.navigate('RecipeDetails', {
        recipeId: id,
      })
    },
  }
}
