/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation addToFavourites($recipeId: UUID!, $profileId: UUID!) {\n    insertIntoProfilesRecipesCollection(objects: [{ recipeId: $recipeId, profileId: $profileId }]) {\n      records {\n        recipeId\n        profileId\n      }\n    }\n  }\n": types.AddToFavouritesDocument,
    "\n  mutation addToMyBar($records: [ProfilesIngredientsInsertInput!]!) {\n    insertIntoProfilesIngredientsCollection(objects: $records) {\n      records {\n        ingredientId\n        profileId\n      }\n    }\n  }\n": types.AddToMyBarDocument,
    "\n  mutation deleteFromFavourites($recipeId: UUID!, $profileId: UUID!) {\n    deleteFromProfilesRecipesCollection(\n      filter: { recipeId: { eq: $recipeId }, profileId: { eq: $profileId } }\n      atMost: 1\n    ) {\n      records {\n        recipeId\n        profileId\n      }\n    }\n  }\n": types.DeleteFromFavouritesDocument,
    "\n  mutation deleteFromMyBar($ingredientIds: [UUID!], $profileIds: [UUID!]) {\n    deleteFromProfilesIngredientsCollection(\n      filter: { ingredientId: { in: $ingredientIds }, profileId: { in: $profileIds } }\n      atMost: 500\n    ) {\n      records {\n        ingredientId\n        profileId\n      }\n    }\n  }\n": types.DeleteFromMyBarDocument,
    "\n  query getCategories($ids: [UUID!]) {\n    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {\n      edges {\n        node {\n          id\n          name\n          imageUrl\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n                imageUrl\n              }\n            }\n          }\n          recipesCategoriesCollection {\n            edges {\n              node {\n                recipe {\n                  id\n                  name\n                  imageUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query getCategoryDetails($categoryId: UUID!) {\n    categoriesCollection(filter: { id: { eq: $categoryId } }) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetCategoryDetailsDocument,
    "\n  query getContent($name: String) {\n    appContentCollection(filter: { name: { eq: $name } }) {\n      edges {\n        node {\n          id\n          content\n        }\n      }\n    }\n  }\n": types.GetContentDocument,
    "\n  query getEquipmentDetails($equipmentId: UUID!) {\n    equipmentCollection(filter: { id: { eq: $equipmentId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n          imageUrl\n        }\n      }\n    }\n  }\n": types.GetEquipmentDetailsDocument,
    "\n  query getFavourites {\n    profilesRecipesCollection {\n      edges {\n        node {\n          recipe {\n            id\n            name\n            imageUrl\n          }\n        }\n      }\n    }\n  }\n": types.GetFavouritesDocument,
    "\n  query getFilterDetails($filterId: UUID!) {\n    categoriesCollection(filter: { id: { eq: $filterId } }) {\n      edges {\n        node {\n          id\n          name\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetFilterDetailsDocument,
    "\n  query getFilters($ids: [UUID!]) {\n    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {\n      edges {\n        node {\n          id\n          name\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetFiltersDocument,
    "\n  query getIngredientDetails($ingredientId: UUID!) {\n    ingredientsCollection(filter: { id: { eq: $ingredientId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n": types.GetIngredientDetailsDocument,
    "\n  query getIngredientsByCategories {\n    ingredientsByCategoriesCollection(first: 100) {\n      edges {\n        node {\n          id\n          title\n          data\n          count\n        }\n      }\n    }\n  }\n": types.GetIngredientsByCategoriesDocument,
    "\n  query getMyBar {\n    profilesIngredientsCollection {\n      edges {\n        node {\n          ingredient {\n            id\n            name\n            ingredientsCategoriesCollection {\n              edges {\n                node {\n                  category {\n                    id\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetMyBarDocument,
    "\n  query getRecipeDetails($recipeId: UUID!) {\n    recipesCollection(filter: { id: { eq: $recipeId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n          imageUrl\n          profilesRecipesCollection {\n            edges {\n              node {\n                profileId\n              }\n            }\n          }\n          recipesIngredientsCollection {\n            edges {\n              node {\n                quantity\n                unit {\n                  id\n                  name\n                }\n                ingredient {\n                  id\n                  name\n                }\n              }\n            }\n          }\n          recipesEquipmentCollection {\n            edges {\n              node {\n                equipment {\n                  id\n                  name\n                  imageUrl\n                }\n              }\n            }\n          }\n          stepsCollection {\n            edges {\n              node {\n                id\n                number\n                description\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetRecipeDetailsDocument,
    "\n  query getRecipesCategories(\n    $first: Int\n    $last: Int\n    $before: Cursor\n    $after: Cursor\n    $filter: RecipesCategoriesFilter\n    $orderBy: [RecipesCategoriesOrderBy!]\n  ) {\n    recipesCategoriesCollection(\n      filter: $filter\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      orderBy: $orderBy\n    ) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n      edges {\n        node {\n          recipe {\n            name\n            id\n            imageUrl\n          }\n        }\n      }\n    }\n  }\n": types.GetRecipesCategoriesDocument,
    "\n  query getUnits {\n    unitsCollection {\n      edges {\n        node {\n          id\n          name\n          plural\n          abbreviation\n          type\n          system\n          isConvertable\n          baseUnitId\n          systemToSystemConversionFactor\n          baseConversionFactor\n        }\n      }\n    }\n  }\n": types.GetUnitsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addToFavourites($recipeId: UUID!, $profileId: UUID!) {\n    insertIntoProfilesRecipesCollection(objects: [{ recipeId: $recipeId, profileId: $profileId }]) {\n      records {\n        recipeId\n        profileId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation addToFavourites($recipeId: UUID!, $profileId: UUID!) {\n    insertIntoProfilesRecipesCollection(objects: [{ recipeId: $recipeId, profileId: $profileId }]) {\n      records {\n        recipeId\n        profileId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addToMyBar($records: [ProfilesIngredientsInsertInput!]!) {\n    insertIntoProfilesIngredientsCollection(objects: $records) {\n      records {\n        ingredientId\n        profileId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation addToMyBar($records: [ProfilesIngredientsInsertInput!]!) {\n    insertIntoProfilesIngredientsCollection(objects: $records) {\n      records {\n        ingredientId\n        profileId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteFromFavourites($recipeId: UUID!, $profileId: UUID!) {\n    deleteFromProfilesRecipesCollection(\n      filter: { recipeId: { eq: $recipeId }, profileId: { eq: $profileId } }\n      atMost: 1\n    ) {\n      records {\n        recipeId\n        profileId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteFromFavourites($recipeId: UUID!, $profileId: UUID!) {\n    deleteFromProfilesRecipesCollection(\n      filter: { recipeId: { eq: $recipeId }, profileId: { eq: $profileId } }\n      atMost: 1\n    ) {\n      records {\n        recipeId\n        profileId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteFromMyBar($ingredientIds: [UUID!], $profileIds: [UUID!]) {\n    deleteFromProfilesIngredientsCollection(\n      filter: { ingredientId: { in: $ingredientIds }, profileId: { in: $profileIds } }\n      atMost: 500\n    ) {\n      records {\n        ingredientId\n        profileId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteFromMyBar($ingredientIds: [UUID!], $profileIds: [UUID!]) {\n    deleteFromProfilesIngredientsCollection(\n      filter: { ingredientId: { in: $ingredientIds }, profileId: { in: $profileIds } }\n      atMost: 500\n    ) {\n      records {\n        ingredientId\n        profileId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategories($ids: [UUID!]) {\n    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {\n      edges {\n        node {\n          id\n          name\n          imageUrl\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n                imageUrl\n              }\n            }\n          }\n          recipesCategoriesCollection {\n            edges {\n              node {\n                recipe {\n                  id\n                  name\n                  imageUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategories($ids: [UUID!]) {\n    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {\n      edges {\n        node {\n          id\n          name\n          imageUrl\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n                imageUrl\n              }\n            }\n          }\n          recipesCategoriesCollection {\n            edges {\n              node {\n                recipe {\n                  id\n                  name\n                  imageUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategoryDetails($categoryId: UUID!) {\n    categoriesCollection(filter: { id: { eq: $categoryId } }) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategoryDetails($categoryId: UUID!) {\n    categoriesCollection(filter: { id: { eq: $categoryId } }) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getContent($name: String) {\n    appContentCollection(filter: { name: { eq: $name } }) {\n      edges {\n        node {\n          id\n          content\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getContent($name: String) {\n    appContentCollection(filter: { name: { eq: $name } }) {\n      edges {\n        node {\n          id\n          content\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getEquipmentDetails($equipmentId: UUID!) {\n    equipmentCollection(filter: { id: { eq: $equipmentId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n          imageUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getEquipmentDetails($equipmentId: UUID!) {\n    equipmentCollection(filter: { id: { eq: $equipmentId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n          imageUrl\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getFavourites {\n    profilesRecipesCollection {\n      edges {\n        node {\n          recipe {\n            id\n            name\n            imageUrl\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getFavourites {\n    profilesRecipesCollection {\n      edges {\n        node {\n          recipe {\n            id\n            name\n            imageUrl\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getFilterDetails($filterId: UUID!) {\n    categoriesCollection(filter: { id: { eq: $filterId } }) {\n      edges {\n        node {\n          id\n          name\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getFilterDetails($filterId: UUID!) {\n    categoriesCollection(filter: { id: { eq: $filterId } }) {\n      edges {\n        node {\n          id\n          name\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getFilters($ids: [UUID!]) {\n    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {\n      edges {\n        node {\n          id\n          name\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getFilters($ids: [UUID!]) {\n    categoriesCollection(filter: { id: { in: $ids } }, orderBy: { name: DescNullsFirst }) {\n      edges {\n        node {\n          id\n          name\n          categoriesCollection {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getIngredientDetails($ingredientId: UUID!) {\n    ingredientsCollection(filter: { id: { eq: $ingredientId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getIngredientDetails($ingredientId: UUID!) {\n    ingredientsCollection(filter: { id: { eq: $ingredientId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getIngredientsByCategories {\n    ingredientsByCategoriesCollection(first: 100) {\n      edges {\n        node {\n          id\n          title\n          data\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getIngredientsByCategories {\n    ingredientsByCategoriesCollection(first: 100) {\n      edges {\n        node {\n          id\n          title\n          data\n          count\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMyBar {\n    profilesIngredientsCollection {\n      edges {\n        node {\n          ingredient {\n            id\n            name\n            ingredientsCategoriesCollection {\n              edges {\n                node {\n                  category {\n                    id\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMyBar {\n    profilesIngredientsCollection {\n      edges {\n        node {\n          ingredient {\n            id\n            name\n            ingredientsCategoriesCollection {\n              edges {\n                node {\n                  category {\n                    id\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRecipeDetails($recipeId: UUID!) {\n    recipesCollection(filter: { id: { eq: $recipeId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n          imageUrl\n          profilesRecipesCollection {\n            edges {\n              node {\n                profileId\n              }\n            }\n          }\n          recipesIngredientsCollection {\n            edges {\n              node {\n                quantity\n                unit {\n                  id\n                  name\n                }\n                ingredient {\n                  id\n                  name\n                }\n              }\n            }\n          }\n          recipesEquipmentCollection {\n            edges {\n              node {\n                equipment {\n                  id\n                  name\n                  imageUrl\n                }\n              }\n            }\n          }\n          stepsCollection {\n            edges {\n              node {\n                id\n                number\n                description\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecipeDetails($recipeId: UUID!) {\n    recipesCollection(filter: { id: { eq: $recipeId } }) {\n      edges {\n        node {\n          id\n          name\n          description\n          imageUrl\n          profilesRecipesCollection {\n            edges {\n              node {\n                profileId\n              }\n            }\n          }\n          recipesIngredientsCollection {\n            edges {\n              node {\n                quantity\n                unit {\n                  id\n                  name\n                }\n                ingredient {\n                  id\n                  name\n                }\n              }\n            }\n          }\n          recipesEquipmentCollection {\n            edges {\n              node {\n                equipment {\n                  id\n                  name\n                  imageUrl\n                }\n              }\n            }\n          }\n          stepsCollection {\n            edges {\n              node {\n                id\n                number\n                description\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRecipesCategories(\n    $first: Int\n    $last: Int\n    $before: Cursor\n    $after: Cursor\n    $filter: RecipesCategoriesFilter\n    $orderBy: [RecipesCategoriesOrderBy!]\n  ) {\n    recipesCategoriesCollection(\n      filter: $filter\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      orderBy: $orderBy\n    ) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n      edges {\n        node {\n          recipe {\n            name\n            id\n            imageUrl\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRecipesCategories(\n    $first: Int\n    $last: Int\n    $before: Cursor\n    $after: Cursor\n    $filter: RecipesCategoriesFilter\n    $orderBy: [RecipesCategoriesOrderBy!]\n  ) {\n    recipesCategoriesCollection(\n      filter: $filter\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      orderBy: $orderBy\n    ) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n      edges {\n        node {\n          recipe {\n            name\n            id\n            imageUrl\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUnits {\n    unitsCollection {\n      edges {\n        node {\n          id\n          name\n          plural\n          abbreviation\n          type\n          system\n          isConvertable\n          baseUnitId\n          systemToSystemConversionFactor\n          baseConversionFactor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUnits {\n    unitsCollection {\n      edges {\n        node {\n          id\n          name\n          plural\n          abbreviation\n          type\n          system\n          isConvertable\n          baseUnitId\n          systemToSystemConversionFactor\n          baseConversionFactor\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;