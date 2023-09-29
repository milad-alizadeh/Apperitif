/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: any; output: any }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any }
  /** A date wihout time information */
  Date: { input: any; output: any }
  /** A date and time */
  Datetime: { input: any; output: any }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any }
  /** A time without date information */
  Time: { input: any; output: any }
  /** A universally unique identifier */
  UUID: { input: any; output: any }
}

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>
  gt?: InputMaybe<Scalars['BigFloat']['input']>
  gte?: InputMaybe<Scalars['BigFloat']['input']>
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['BigFloat']['input']>
  lte?: InputMaybe<Scalars['BigFloat']['input']>
  neq?: InputMaybe<Scalars['BigFloat']['input']>
}

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>
  gt?: InputMaybe<Scalars['BigInt']['input']>
  gte?: InputMaybe<Scalars['BigInt']['input']>
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['BigInt']['input']>
  lte?: InputMaybe<Scalars['BigInt']['input']>
  neq?: InputMaybe<Scalars['BigInt']['input']>
}

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>
  is?: InputMaybe<FilterIs>
}

export type Categories = Node & {
  __typename?: 'Categories'
  categoriesCollection?: Maybe<CategoriesConnection>
  createdAt: Scalars['Datetime']['output']
  id: Scalars['UUID']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  ingredientsCategoriesCollection?: Maybe<IngredientsCategoriesConnection>
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  parent?: Maybe<Categories>
  parentId?: Maybe<Scalars['UUID']['output']>
  recipesCategoriesCollection?: Maybe<RecipesCategoriesConnection>
  updatedAt: Scalars['Datetime']['output']
}

export type CategoriesCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<CategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>
}

export type CategoriesIngredientsCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<IngredientsCategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<IngredientsCategoriesOrderBy>>
}

export type CategoriesRecipesCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesCategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesCategoriesOrderBy>>
}

export type CategoriesConnection = {
  __typename?: 'CategoriesConnection'
  edges: Array<CategoriesEdge>
  pageInfo: PageInfo
}

export type CategoriesDeleteResponse = {
  __typename?: 'CategoriesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Categories>
}

export type CategoriesEdge = {
  __typename?: 'CategoriesEdge'
  cursor: Scalars['String']['output']
  node: Categories
}

export type CategoriesFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  id?: InputMaybe<UuidFilter>
  imageUrl?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  parentId?: InputMaybe<UuidFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type CategoriesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  parentId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type CategoriesInsertResponse = {
  __typename?: 'CategoriesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Categories>
}

export type CategoriesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  imageUrl?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
  parentId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type CategoriesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  parentId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type CategoriesUpdateResponse = {
  __typename?: 'CategoriesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Categories>
}

export type ContentApperitivo = Node & {
  __typename?: 'ContentApperitivo'
  content?: Maybe<Scalars['JSON']['output']>
  createdAt: Scalars['Datetime']['output']
  id: Scalars['UUID']['output']
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  updatedAt: Scalars['Datetime']['output']
}

export type ContentApperitivoConnection = {
  __typename?: 'ContentApperitivoConnection'
  edges: Array<ContentApperitivoEdge>
  pageInfo: PageInfo
}

export type ContentApperitivoDeleteResponse = {
  __typename?: 'ContentApperitivoDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ContentApperitivo>
}

export type ContentApperitivoEdge = {
  __typename?: 'ContentApperitivoEdge'
  cursor: Scalars['String']['output']
  node: ContentApperitivo
}

export type ContentApperitivoFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type ContentApperitivoInsertInput = {
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ContentApperitivoInsertResponse = {
  __typename?: 'ContentApperitivoInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ContentApperitivo>
}

export type ContentApperitivoOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type ContentApperitivoUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ContentApperitivoUpdateResponse = {
  __typename?: 'ContentApperitivoUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ContentApperitivo>
}

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>
  gt?: InputMaybe<Scalars['Date']['input']>
  gte?: InputMaybe<Scalars['Date']['input']>
  in?: InputMaybe<Array<Scalars['Date']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Date']['input']>
  lte?: InputMaybe<Scalars['Date']['input']>
  neq?: InputMaybe<Scalars['Date']['input']>
}

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>
  gt?: InputMaybe<Scalars['Datetime']['input']>
  gte?: InputMaybe<Scalars['Datetime']['input']>
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Datetime']['input']>
  lte?: InputMaybe<Scalars['Datetime']['input']>
  neq?: InputMaybe<Scalars['Datetime']['input']>
}

export type Equipments = Node & {
  __typename?: 'Equipments'
  createdAt: Scalars['Datetime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  recipesEquipmentsCollection?: Maybe<RecipesEquipmentsConnection>
  updatedAt: Scalars['Datetime']['output']
}

export type EquipmentsRecipesEquipmentsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesEquipmentsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesEquipmentsOrderBy>>
}

export type EquipmentsConnection = {
  __typename?: 'EquipmentsConnection'
  edges: Array<EquipmentsEdge>
  pageInfo: PageInfo
}

export type EquipmentsDeleteResponse = {
  __typename?: 'EquipmentsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Equipments>
}

export type EquipmentsEdge = {
  __typename?: 'EquipmentsEdge'
  cursor: Scalars['String']['output']
  node: Equipments
}

export type EquipmentsFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  imageUrl?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type EquipmentsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type EquipmentsInsertResponse = {
  __typename?: 'EquipmentsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Equipments>
}

export type EquipmentsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  description?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  imageUrl?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type EquipmentsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type EquipmentsUpdateResponse = {
  __typename?: 'EquipmentsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Equipments>
}

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL',
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  in?: InputMaybe<Array<Scalars['Float']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
  neq?: InputMaybe<Scalars['Float']['input']>
}

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>
}

export type Ingredients = Node & {
  __typename?: 'Ingredients'
  createdAt: Scalars['Datetime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  ingredientsCategoriesCollection?: Maybe<IngredientsCategoriesConnection>
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  profilesIngredientsCollection?: Maybe<ProfilesIngredientsConnection>
  recipesIngredientsCollection?: Maybe<RecipesIngredientsConnection>
  updatedAt: Scalars['Datetime']['output']
}

export type IngredientsIngredientsCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<IngredientsCategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<IngredientsCategoriesOrderBy>>
}

export type IngredientsProfilesIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ProfilesIngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilesIngredientsOrderBy>>
}

export type IngredientsRecipesIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesIngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesIngredientsOrderBy>>
}

export type IngredientsCategories = Node & {
  __typename?: 'IngredientsCategories'
  category: Categories
  categoryId: Scalars['UUID']['output']
  createdAt: Scalars['Datetime']['output']
  ingredient: Ingredients
  ingredientId: Scalars['UUID']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  updatedAt: Scalars['Datetime']['output']
}

export type IngredientsCategoriesConnection = {
  __typename?: 'IngredientsCategoriesConnection'
  edges: Array<IngredientsCategoriesEdge>
  pageInfo: PageInfo
  /** The total number of records matching the `filter` criteria */
  totalCount: Scalars['Int']['output']
}

export type IngredientsCategoriesDeleteResponse = {
  __typename?: 'IngredientsCategoriesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<IngredientsCategories>
}

export type IngredientsCategoriesEdge = {
  __typename?: 'IngredientsCategoriesEdge'
  cursor: Scalars['String']['output']
  node: IngredientsCategories
}

export type IngredientsCategoriesFilter = {
  categoryId?: InputMaybe<UuidFilter>
  createdAt?: InputMaybe<DatetimeFilter>
  ingredientId?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type IngredientsCategoriesInsertInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  ingredientId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type IngredientsCategoriesInsertResponse = {
  __typename?: 'IngredientsCategoriesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<IngredientsCategories>
}

export type IngredientsCategoriesOrderBy = {
  categoryId?: InputMaybe<OrderByDirection>
  createdAt?: InputMaybe<OrderByDirection>
  ingredientId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type IngredientsCategoriesUpdateInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  ingredientId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type IngredientsCategoriesUpdateResponse = {
  __typename?: 'IngredientsCategoriesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<IngredientsCategories>
}

export type IngredientsConnection = {
  __typename?: 'IngredientsConnection'
  edges: Array<IngredientsEdge>
  pageInfo: PageInfo
}

export type IngredientsDeleteResponse = {
  __typename?: 'IngredientsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Ingredients>
}

export type IngredientsEdge = {
  __typename?: 'IngredientsEdge'
  cursor: Scalars['String']['output']
  node: Ingredients
}

export type IngredientsFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type IngredientsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type IngredientsInsertResponse = {
  __typename?: 'IngredientsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Ingredients>
}

export type IngredientsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  description?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type IngredientsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type IngredientsUpdateResponse = {
  __typename?: 'IngredientsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Ingredients>
}

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  neq?: InputMaybe<Scalars['Int']['input']>
}

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation'
  /** Deletes zero or more records from the `Categories` collection */
  deleteFromCategoriesCollection: CategoriesDeleteResponse
  /** Deletes zero or more records from the `ContentApperitivo` collection */
  deleteFromContentApperitivoCollection: ContentApperitivoDeleteResponse
  /** Deletes zero or more records from the `Equipments` collection */
  deleteFromEquipmentsCollection: EquipmentsDeleteResponse
  /** Deletes zero or more records from the `IngredientsCategories` collection */
  deleteFromIngredientsCategoriesCollection: IngredientsCategoriesDeleteResponse
  /** Deletes zero or more records from the `Ingredients` collection */
  deleteFromIngredientsCollection: IngredientsDeleteResponse
  /** Deletes zero or more records from the `Profiles` collection */
  deleteFromProfilesCollection: ProfilesDeleteResponse
  /** Deletes zero or more records from the `ProfilesIngredients` collection */
  deleteFromProfilesIngredientsCollection: ProfilesIngredientsDeleteResponse
  /** Deletes zero or more records from the `ProfilesRecipes` collection */
  deleteFromProfilesRecipesCollection: ProfilesRecipesDeleteResponse
  /** Deletes zero or more records from the `RecipesCategories` collection */
  deleteFromRecipesCategoriesCollection: RecipesCategoriesDeleteResponse
  /** Deletes zero or more records from the `Recipes` collection */
  deleteFromRecipesCollection: RecipesDeleteResponse
  /** Deletes zero or more records from the `RecipesEquipments` collection */
  deleteFromRecipesEquipmentsCollection: RecipesEquipmentsDeleteResponse
  /** Deletes zero or more records from the `RecipesIngredients` collection */
  deleteFromRecipesIngredientsCollection: RecipesIngredientsDeleteResponse
  /** Deletes zero or more records from the `Steps` collection */
  deleteFromStepsCollection: StepsDeleteResponse
  /** Deletes zero or more records from the `Units` collection */
  deleteFromUnitsCollection: UnitsDeleteResponse
  /** Adds one or more `Categories` records to the collection */
  insertIntoCategoriesCollection?: Maybe<CategoriesInsertResponse>
  /** Adds one or more `ContentApperitivo` records to the collection */
  insertIntoContentApperitivoCollection?: Maybe<ContentApperitivoInsertResponse>
  /** Adds one or more `Equipments` records to the collection */
  insertIntoEquipmentsCollection?: Maybe<EquipmentsInsertResponse>
  /** Adds one or more `IngredientsCategories` records to the collection */
  insertIntoIngredientsCategoriesCollection?: Maybe<IngredientsCategoriesInsertResponse>
  /** Adds one or more `Ingredients` records to the collection */
  insertIntoIngredientsCollection?: Maybe<IngredientsInsertResponse>
  /** Adds one or more `Profiles` records to the collection */
  insertIntoProfilesCollection?: Maybe<ProfilesInsertResponse>
  /** Adds one or more `ProfilesIngredients` records to the collection */
  insertIntoProfilesIngredientsCollection?: Maybe<ProfilesIngredientsInsertResponse>
  /** Adds one or more `ProfilesRecipes` records to the collection */
  insertIntoProfilesRecipesCollection?: Maybe<ProfilesRecipesInsertResponse>
  /** Adds one or more `RecipesCategories` records to the collection */
  insertIntoRecipesCategoriesCollection?: Maybe<RecipesCategoriesInsertResponse>
  /** Adds one or more `Recipes` records to the collection */
  insertIntoRecipesCollection?: Maybe<RecipesInsertResponse>
  /** Adds one or more `RecipesEquipments` records to the collection */
  insertIntoRecipesEquipmentsCollection?: Maybe<RecipesEquipmentsInsertResponse>
  /** Adds one or more `RecipesIngredients` records to the collection */
  insertIntoRecipesIngredientsCollection?: Maybe<RecipesIngredientsInsertResponse>
  /** Adds one or more `Steps` records to the collection */
  insertIntoStepsCollection?: Maybe<StepsInsertResponse>
  /** Adds one or more `Units` records to the collection */
  insertIntoUnitsCollection?: Maybe<UnitsInsertResponse>
  /** Updates zero or more records in the `Categories` collection */
  updateCategoriesCollection: CategoriesUpdateResponse
  /** Updates zero or more records in the `ContentApperitivo` collection */
  updateContentApperitivoCollection: ContentApperitivoUpdateResponse
  /** Updates zero or more records in the `Equipments` collection */
  updateEquipmentsCollection: EquipmentsUpdateResponse
  /** Updates zero or more records in the `IngredientsCategories` collection */
  updateIngredientsCategoriesCollection: IngredientsCategoriesUpdateResponse
  /** Updates zero or more records in the `Ingredients` collection */
  updateIngredientsCollection: IngredientsUpdateResponse
  /** Updates zero or more records in the `Profiles` collection */
  updateProfilesCollection: ProfilesUpdateResponse
  /** Updates zero or more records in the `ProfilesIngredients` collection */
  updateProfilesIngredientsCollection: ProfilesIngredientsUpdateResponse
  /** Updates zero or more records in the `ProfilesRecipes` collection */
  updateProfilesRecipesCollection: ProfilesRecipesUpdateResponse
  /** Updates zero or more records in the `RecipesCategories` collection */
  updateRecipesCategoriesCollection: RecipesCategoriesUpdateResponse
  /** Updates zero or more records in the `Recipes` collection */
  updateRecipesCollection: RecipesUpdateResponse
  /** Updates zero or more records in the `RecipesEquipments` collection */
  updateRecipesEquipmentsCollection: RecipesEquipmentsUpdateResponse
  /** Updates zero or more records in the `RecipesIngredients` collection */
  updateRecipesIngredientsCollection: RecipesIngredientsUpdateResponse
  /** Updates zero or more records in the `Steps` collection */
  updateStepsCollection: StepsUpdateResponse
  /** Updates zero or more records in the `Units` collection */
  updateUnitsCollection: UnitsUpdateResponse
}

/** The root type for creating and mutating data */
export type MutationDeleteFromCategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<CategoriesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromContentApperitivoCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ContentApperitivoFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromEquipmentsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<EquipmentsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromIngredientsCategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<IngredientsCategoriesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromIngredientsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<IngredientsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromProfilesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ProfilesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromProfilesIngredientsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ProfilesIngredientsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromProfilesRecipesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ProfilesRecipesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromRecipesCategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesCategoriesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromRecipesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromRecipesEquipmentsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesEquipmentsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromRecipesIngredientsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesIngredientsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromStepsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<StepsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromUnitsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<UnitsFilter>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoCategoriesCollectionArgs = {
  objects: Array<CategoriesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoContentApperitivoCollectionArgs = {
  objects: Array<ContentApperitivoInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoEquipmentsCollectionArgs = {
  objects: Array<EquipmentsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoIngredientsCategoriesCollectionArgs = {
  objects: Array<IngredientsCategoriesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoIngredientsCollectionArgs = {
  objects: Array<IngredientsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoProfilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoProfilesIngredientsCollectionArgs = {
  objects: Array<ProfilesIngredientsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoProfilesRecipesCollectionArgs = {
  objects: Array<ProfilesRecipesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoRecipesCategoriesCollectionArgs = {
  objects: Array<RecipesCategoriesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoRecipesCollectionArgs = {
  objects: Array<RecipesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoRecipesEquipmentsCollectionArgs = {
  objects: Array<RecipesEquipmentsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoRecipesIngredientsCollectionArgs = {
  objects: Array<RecipesIngredientsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoStepsCollectionArgs = {
  objects: Array<StepsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoUnitsCollectionArgs = {
  objects: Array<UnitsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationUpdateCategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<CategoriesFilter>
  set: CategoriesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateContentApperitivoCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ContentApperitivoFilter>
  set: ContentApperitivoUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateEquipmentsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<EquipmentsFilter>
  set: EquipmentsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateIngredientsCategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<IngredientsCategoriesFilter>
  set: IngredientsCategoriesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateIngredientsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<IngredientsFilter>
  set: IngredientsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateProfilesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ProfilesFilter>
  set: ProfilesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateProfilesIngredientsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ProfilesIngredientsFilter>
  set: ProfilesIngredientsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateProfilesRecipesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ProfilesRecipesFilter>
  set: ProfilesRecipesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateRecipesCategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesCategoriesFilter>
  set: RecipesCategoriesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateRecipesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesFilter>
  set: RecipesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateRecipesEquipmentsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesEquipmentsFilter>
  set: RecipesEquipmentsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateRecipesIngredientsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<RecipesIngredientsFilter>
  set: RecipesIngredientsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateStepsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<StepsFilter>
  set: StepsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateUnitsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<UnitsFilter>
  set: UnitsUpdateInput
}

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output']
}

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>
  is?: InputMaybe<FilterIs>
}

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast',
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']['output']>
  hasNextPage: Scalars['Boolean']['output']
  hasPreviousPage: Scalars['Boolean']['output']
  startCursor?: Maybe<Scalars['String']['output']>
}

export type Profiles = Node & {
  __typename?: 'Profiles'
  createdAt: Scalars['Datetime']['output']
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  name?: Maybe<Scalars['String']['output']>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  profilesIngredientsCollection?: Maybe<ProfilesIngredientsConnection>
  profilesRecipesCollection?: Maybe<ProfilesRecipesConnection>
  updatedAt: Scalars['Datetime']['output']
}

export type ProfilesProfilesIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ProfilesIngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilesIngredientsOrderBy>>
}

export type ProfilesProfilesRecipesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ProfilesRecipesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilesRecipesOrderBy>>
}

export type ProfilesConnection = {
  __typename?: 'ProfilesConnection'
  edges: Array<ProfilesEdge>
  pageInfo: PageInfo
}

export type ProfilesDeleteResponse = {
  __typename?: 'ProfilesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Profiles>
}

export type ProfilesEdge = {
  __typename?: 'ProfilesEdge'
  cursor: Scalars['String']['output']
  node: Profiles
}

export type ProfilesFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  email?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type ProfilesIngredients = Node & {
  __typename?: 'ProfilesIngredients'
  createdAt: Scalars['Datetime']['output']
  ingredient: Ingredients
  ingredientId: Scalars['UUID']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  profile: Profiles
  profileId: Scalars['UUID']['output']
  updatedAt: Scalars['Datetime']['output']
}

export type ProfilesIngredientsConnection = {
  __typename?: 'ProfilesIngredientsConnection'
  edges: Array<ProfilesIngredientsEdge>
  pageInfo: PageInfo
}

export type ProfilesIngredientsDeleteResponse = {
  __typename?: 'ProfilesIngredientsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ProfilesIngredients>
}

export type ProfilesIngredientsEdge = {
  __typename?: 'ProfilesIngredientsEdge'
  cursor: Scalars['String']['output']
  node: ProfilesIngredients
}

export type ProfilesIngredientsFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  ingredientId?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  profileId?: InputMaybe<UuidFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type ProfilesIngredientsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  ingredientId?: InputMaybe<Scalars['UUID']['input']>
  profileId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ProfilesIngredientsInsertResponse = {
  __typename?: 'ProfilesIngredientsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ProfilesIngredients>
}

export type ProfilesIngredientsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  ingredientId?: InputMaybe<OrderByDirection>
  profileId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type ProfilesIngredientsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  ingredientId?: InputMaybe<Scalars['UUID']['input']>
  profileId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ProfilesIngredientsUpdateResponse = {
  __typename?: 'ProfilesIngredientsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ProfilesIngredients>
}

export type ProfilesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ProfilesInsertResponse = {
  __typename?: 'ProfilesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Profiles>
}

export type ProfilesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  email?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type ProfilesRecipes = Node & {
  __typename?: 'ProfilesRecipes'
  createdAt: Scalars['Datetime']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  profile: Profiles
  profileId: Scalars['UUID']['output']
  recipe: Recipes
  recipeId: Scalars['UUID']['output']
  updatedAt: Scalars['Datetime']['output']
}

export type ProfilesRecipesConnection = {
  __typename?: 'ProfilesRecipesConnection'
  edges: Array<ProfilesRecipesEdge>
  pageInfo: PageInfo
}

export type ProfilesRecipesDeleteResponse = {
  __typename?: 'ProfilesRecipesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ProfilesRecipes>
}

export type ProfilesRecipesEdge = {
  __typename?: 'ProfilesRecipesEdge'
  cursor: Scalars['String']['output']
  node: ProfilesRecipes
}

export type ProfilesRecipesFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  nodeId?: InputMaybe<IdFilter>
  profileId?: InputMaybe<UuidFilter>
  recipeId?: InputMaybe<UuidFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type ProfilesRecipesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  profileId?: InputMaybe<Scalars['UUID']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ProfilesRecipesInsertResponse = {
  __typename?: 'ProfilesRecipesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ProfilesRecipes>
}

export type ProfilesRecipesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  profileId?: InputMaybe<OrderByDirection>
  recipeId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type ProfilesRecipesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  profileId?: InputMaybe<Scalars['UUID']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ProfilesRecipesUpdateResponse = {
  __typename?: 'ProfilesRecipesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<ProfilesRecipes>
}

export type ProfilesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type ProfilesUpdateResponse = {
  __typename?: 'ProfilesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Profiles>
}

/** The root type for querying data */
export type Query = {
  __typename?: 'Query'
  /** A pagable collection of type `Categories` */
  categoriesCollection?: Maybe<CategoriesConnection>
  /** A pagable collection of type `ContentApperitivo` */
  contentApperitivoCollection?: Maybe<ContentApperitivoConnection>
  /** A pagable collection of type `Equipments` */
  equipmentsCollection?: Maybe<EquipmentsConnection>
  /** A pagable collection of type `IngredientsCategories` */
  ingredientsCategoriesCollection?: Maybe<IngredientsCategoriesConnection>
  /** A pagable collection of type `Ingredients` */
  ingredientsCollection?: Maybe<IngredientsConnection>
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>
  /** A pagable collection of type `Profiles` */
  profilesCollection?: Maybe<ProfilesConnection>
  /** A pagable collection of type `ProfilesIngredients` */
  profilesIngredientsCollection?: Maybe<ProfilesIngredientsConnection>
  /** A pagable collection of type `ProfilesRecipes` */
  profilesRecipesCollection?: Maybe<ProfilesRecipesConnection>
  /** A pagable collection of type `RecipesCategories` */
  recipesCategoriesCollection?: Maybe<RecipesCategoriesConnection>
  /** A pagable collection of type `Recipes` */
  recipesCollection?: Maybe<RecipesConnection>
  /** A pagable collection of type `RecipesEquipments` */
  recipesEquipmentsCollection?: Maybe<RecipesEquipmentsConnection>
  /** A pagable collection of type `RecipesIngredients` */
  recipesIngredientsCollection?: Maybe<RecipesIngredientsConnection>
  /** A pagable collection of type `Steps` */
  stepsCollection?: Maybe<StepsConnection>
  /** A pagable collection of type `Units` */
  unitsCollection?: Maybe<UnitsConnection>
}

/** The root type for querying data */
export type QueryCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<CategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>
}

/** The root type for querying data */
export type QueryContentApperitivoCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ContentApperitivoFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ContentApperitivoOrderBy>>
}

/** The root type for querying data */
export type QueryEquipmentsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<EquipmentsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<EquipmentsOrderBy>>
}

/** The root type for querying data */
export type QueryIngredientsCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<IngredientsCategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<IngredientsCategoriesOrderBy>>
}

/** The root type for querying data */
export type QueryIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<IngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<IngredientsOrderBy>>
}

/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ProfilesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>
}

/** The root type for querying data */
export type QueryProfilesIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ProfilesIngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilesIngredientsOrderBy>>
}

/** The root type for querying data */
export type QueryProfilesRecipesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ProfilesRecipesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilesRecipesOrderBy>>
}

/** The root type for querying data */
export type QueryRecipesCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesCategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesCategoriesOrderBy>>
}

/** The root type for querying data */
export type QueryRecipesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesOrderBy>>
}

/** The root type for querying data */
export type QueryRecipesEquipmentsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesEquipmentsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesEquipmentsOrderBy>>
}

/** The root type for querying data */
export type QueryRecipesIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesIngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesIngredientsOrderBy>>
}

/** The root type for querying data */
export type QueryStepsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<StepsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<StepsOrderBy>>
}

/** The root type for querying data */
export type QueryUnitsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<UnitsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UnitsOrderBy>>
}

export type Recipes = Node & {
  __typename?: 'Recipes'
  createdAt: Scalars['Datetime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  profilesRecipesCollection?: Maybe<ProfilesRecipesConnection>
  recipesCategoriesCollection?: Maybe<RecipesCategoriesConnection>
  recipesEquipmentsCollection?: Maybe<RecipesEquipmentsConnection>
  recipesIngredientsCollection?: Maybe<RecipesIngredientsConnection>
  stepsCollection?: Maybe<StepsConnection>
  updatedAt: Scalars['Datetime']['output']
}

export type RecipesProfilesRecipesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ProfilesRecipesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ProfilesRecipesOrderBy>>
}

export type RecipesRecipesCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesCategoriesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesCategoriesOrderBy>>
}

export type RecipesRecipesEquipmentsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesEquipmentsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesEquipmentsOrderBy>>
}

export type RecipesRecipesIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesIngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesIngredientsOrderBy>>
}

export type RecipesStepsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<StepsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<StepsOrderBy>>
}

export type RecipesCategories = Node & {
  __typename?: 'RecipesCategories'
  category: Categories
  categoryId: Scalars['UUID']['output']
  createdAt: Scalars['Datetime']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  recipe: Recipes
  recipeId: Scalars['UUID']['output']
  updatedAt: Scalars['Datetime']['output']
}

export type RecipesCategoriesConnection = {
  __typename?: 'RecipesCategoriesConnection'
  edges: Array<RecipesCategoriesEdge>
  pageInfo: PageInfo
}

export type RecipesCategoriesDeleteResponse = {
  __typename?: 'RecipesCategoriesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesCategories>
}

export type RecipesCategoriesEdge = {
  __typename?: 'RecipesCategoriesEdge'
  cursor: Scalars['String']['output']
  node: RecipesCategories
}

export type RecipesCategoriesFilter = {
  categoryId?: InputMaybe<UuidFilter>
  createdAt?: InputMaybe<DatetimeFilter>
  nodeId?: InputMaybe<IdFilter>
  recipeId?: InputMaybe<UuidFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type RecipesCategoriesInsertInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesCategoriesInsertResponse = {
  __typename?: 'RecipesCategoriesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesCategories>
}

export type RecipesCategoriesOrderBy = {
  categoryId?: InputMaybe<OrderByDirection>
  createdAt?: InputMaybe<OrderByDirection>
  recipeId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type RecipesCategoriesUpdateInput = {
  categoryId?: InputMaybe<Scalars['UUID']['input']>
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesCategoriesUpdateResponse = {
  __typename?: 'RecipesCategoriesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesCategories>
}

export type RecipesConnection = {
  __typename?: 'RecipesConnection'
  edges: Array<RecipesEdge>
  pageInfo: PageInfo
}

export type RecipesDeleteResponse = {
  __typename?: 'RecipesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Recipes>
}

export type RecipesEdge = {
  __typename?: 'RecipesEdge'
  cursor: Scalars['String']['output']
  node: Recipes
}

export type RecipesEquipments = Node & {
  __typename?: 'RecipesEquipments'
  createdAt: Scalars['Datetime']['output']
  equipment: Equipments
  equipmentId: Scalars['UUID']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  recipe: Recipes
  recipeId: Scalars['UUID']['output']
  updatedAt: Scalars['Datetime']['output']
}

export type RecipesEquipmentsConnection = {
  __typename?: 'RecipesEquipmentsConnection'
  edges: Array<RecipesEquipmentsEdge>
  pageInfo: PageInfo
}

export type RecipesEquipmentsDeleteResponse = {
  __typename?: 'RecipesEquipmentsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesEquipments>
}

export type RecipesEquipmentsEdge = {
  __typename?: 'RecipesEquipmentsEdge'
  cursor: Scalars['String']['output']
  node: RecipesEquipments
}

export type RecipesEquipmentsFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  equipmentId?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  recipeId?: InputMaybe<UuidFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type RecipesEquipmentsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  equipmentId?: InputMaybe<Scalars['UUID']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesEquipmentsInsertResponse = {
  __typename?: 'RecipesEquipmentsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesEquipments>
}

export type RecipesEquipmentsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  equipmentId?: InputMaybe<OrderByDirection>
  recipeId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type RecipesEquipmentsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  equipmentId?: InputMaybe<Scalars['UUID']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesEquipmentsUpdateResponse = {
  __typename?: 'RecipesEquipmentsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesEquipments>
}

export type RecipesFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  imageUrl?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type RecipesIngredients = Node & {
  __typename?: 'RecipesIngredients'
  createdAt: Scalars['Datetime']['output']
  ingredient: Ingredients
  ingredientId: Scalars['UUID']['output']
  isOptional?: Maybe<Scalars['Boolean']['output']>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  quantity?: Maybe<Scalars['Float']['output']>
  recipe: Recipes
  recipeId: Scalars['UUID']['output']
  unit?: Maybe<Units>
  unitId?: Maybe<Scalars['UUID']['output']>
  updatedAt: Scalars['Datetime']['output']
}

export type RecipesIngredientsConnection = {
  __typename?: 'RecipesIngredientsConnection'
  edges: Array<RecipesIngredientsEdge>
  pageInfo: PageInfo
}

export type RecipesIngredientsDeleteResponse = {
  __typename?: 'RecipesIngredientsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesIngredients>
}

export type RecipesIngredientsEdge = {
  __typename?: 'RecipesIngredientsEdge'
  cursor: Scalars['String']['output']
  node: RecipesIngredients
}

export type RecipesIngredientsFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  ingredientId?: InputMaybe<UuidFilter>
  isOptional?: InputMaybe<BooleanFilter>
  nodeId?: InputMaybe<IdFilter>
  quantity?: InputMaybe<FloatFilter>
  recipeId?: InputMaybe<UuidFilter>
  unitId?: InputMaybe<UuidFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type RecipesIngredientsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  ingredientId?: InputMaybe<Scalars['UUID']['input']>
  isOptional?: InputMaybe<Scalars['Boolean']['input']>
  quantity?: InputMaybe<Scalars['Float']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  unitId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesIngredientsInsertResponse = {
  __typename?: 'RecipesIngredientsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesIngredients>
}

export type RecipesIngredientsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  ingredientId?: InputMaybe<OrderByDirection>
  isOptional?: InputMaybe<OrderByDirection>
  quantity?: InputMaybe<OrderByDirection>
  recipeId?: InputMaybe<OrderByDirection>
  unitId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type RecipesIngredientsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  ingredientId?: InputMaybe<Scalars['UUID']['input']>
  isOptional?: InputMaybe<Scalars['Boolean']['input']>
  quantity?: InputMaybe<Scalars['Float']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  unitId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesIngredientsUpdateResponse = {
  __typename?: 'RecipesIngredientsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<RecipesIngredients>
}

export type RecipesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesInsertResponse = {
  __typename?: 'RecipesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Recipes>
}

export type RecipesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  description?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  imageUrl?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type RecipesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  imageUrl?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type RecipesUpdateResponse = {
  __typename?: 'RecipesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Recipes>
}

export type Steps = Node & {
  __typename?: 'Steps'
  createdAt: Scalars['Datetime']['output']
  description: Scalars['String']['output']
  id: Scalars['UUID']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  number: Scalars['Int']['output']
  recipe?: Maybe<Recipes>
  recipeId?: Maybe<Scalars['UUID']['output']>
  updatedAt: Scalars['Datetime']['output']
}

export type StepsConnection = {
  __typename?: 'StepsConnection'
  edges: Array<StepsEdge>
  pageInfo: PageInfo
}

export type StepsDeleteResponse = {
  __typename?: 'StepsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Steps>
}

export type StepsEdge = {
  __typename?: 'StepsEdge'
  cursor: Scalars['String']['output']
  node: Steps
}

export type StepsFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  number?: InputMaybe<IntFilter>
  recipeId?: InputMaybe<UuidFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type StepsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  number?: InputMaybe<Scalars['Int']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type StepsInsertResponse = {
  __typename?: 'StepsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Steps>
}

export type StepsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  description?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  number?: InputMaybe<OrderByDirection>
  recipeId?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type StepsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  number?: InputMaybe<Scalars['Int']['input']>
  recipeId?: InputMaybe<Scalars['UUID']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type StepsUpdateResponse = {
  __typename?: 'StepsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Steps>
}

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  ilike?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  iregex?: InputMaybe<Scalars['String']['input']>
  is?: InputMaybe<FilterIs>
  like?: InputMaybe<Scalars['String']['input']>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  neq?: InputMaybe<Scalars['String']['input']>
  regex?: InputMaybe<Scalars['String']['input']>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>
  gt?: InputMaybe<Scalars['Time']['input']>
  gte?: InputMaybe<Scalars['Time']['input']>
  in?: InputMaybe<Array<Scalars['Time']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Time']['input']>
  lte?: InputMaybe<Scalars['Time']['input']>
  neq?: InputMaybe<Scalars['Time']['input']>
}

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>
  in?: InputMaybe<Array<Scalars['UUID']['input']>>
  is?: InputMaybe<FilterIs>
  neq?: InputMaybe<Scalars['UUID']['input']>
}

export type Units = Node & {
  __typename?: 'Units'
  createdAt: Scalars['Datetime']['output']
  id: Scalars['UUID']['output']
  isConvertable?: Maybe<Scalars['Boolean']['output']>
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  recipesIngredientsCollection?: Maybe<RecipesIngredientsConnection>
  updatedAt: Scalars['Datetime']['output']
}

export type UnitsRecipesIngredientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesIngredientsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesIngredientsOrderBy>>
}

export type UnitsConnection = {
  __typename?: 'UnitsConnection'
  edges: Array<UnitsEdge>
  pageInfo: PageInfo
}

export type UnitsDeleteResponse = {
  __typename?: 'UnitsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Units>
}

export type UnitsEdge = {
  __typename?: 'UnitsEdge'
  cursor: Scalars['String']['output']
  node: Units
}

export type UnitsFilter = {
  createdAt?: InputMaybe<DatetimeFilter>
  id?: InputMaybe<UuidFilter>
  isConvertable?: InputMaybe<BooleanFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  updatedAt?: InputMaybe<DatetimeFilter>
}

export type UnitsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  isConvertable?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type UnitsInsertResponse = {
  __typename?: 'UnitsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Units>
}

export type UnitsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  isConvertable?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
  updatedAt?: InputMaybe<OrderByDirection>
}

export type UnitsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  isConvertable?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>
}

export type UnitsUpdateResponse = {
  __typename?: 'UnitsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Units>
}

export type AddToFavouritesMutationVariables = Exact<{
  recipeId: Scalars['UUID']['input']
  profileId: Scalars['UUID']['input']
}>

export type AddToFavouritesMutation = {
  __typename?: 'Mutation'
  insertIntoProfilesRecipesCollection?: {
    __typename?: 'ProfilesRecipesInsertResponse'
    records: Array<{ __typename?: 'ProfilesRecipes'; recipeId: any; profileId: any }>
  } | null
}

export type AddToMyBarMutationVariables = Exact<{
  records: Array<ProfilesIngredientsInsertInput> | ProfilesIngredientsInsertInput
}>

export type AddToMyBarMutation = {
  __typename?: 'Mutation'
  insertIntoProfilesIngredientsCollection?: {
    __typename?: 'ProfilesIngredientsInsertResponse'
    records: Array<{ __typename?: 'ProfilesIngredients'; ingredientId: any; profileId: any }>
  } | null
}

export type DeleteFromFavouritesMutationVariables = Exact<{
  recipeId: Scalars['UUID']['input']
  profileId: Scalars['UUID']['input']
}>

export type DeleteFromFavouritesMutation = {
  __typename?: 'Mutation'
  deleteFromProfilesRecipesCollection: {
    __typename?: 'ProfilesRecipesDeleteResponse'
    records: Array<{ __typename?: 'ProfilesRecipes'; recipeId: any; profileId: any }>
  }
}

export type DeleteFromMyBarMutationVariables = Exact<{
  ingredientIds?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>
  profileIds?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>
}>

export type DeleteFromMyBarMutation = {
  __typename?: 'Mutation'
  deleteFromProfilesIngredientsCollection: {
    __typename?: 'ProfilesIngredientsDeleteResponse'
    records: Array<{ __typename?: 'ProfilesIngredients'; ingredientId: any; profileId: any }>
  }
}

export type GetCategoriesQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>
}>

export type GetCategoriesQuery = {
  __typename?: 'Query'
  categoriesCollection?: {
    __typename?: 'CategoriesConnection'
    edges: Array<{
      __typename?: 'CategoriesEdge'
      node: {
        __typename?: 'Categories'
        id: any
        name: string
        imageUrl?: string | null
        categoriesCollection?: {
          __typename?: 'CategoriesConnection'
          edges: Array<{
            __typename?: 'CategoriesEdge'
            node: { __typename?: 'Categories'; id: any; name: string; imageUrl?: string | null }
          }>
        } | null
        recipesCategoriesCollection?: {
          __typename?: 'RecipesCategoriesConnection'
          edges: Array<{
            __typename?: 'RecipesCategoriesEdge'
            node: {
              __typename?: 'RecipesCategories'
              recipe: { __typename?: 'Recipes'; id: any; name: string; imageUrl?: string | null }
            }
          }>
        } | null
      }
    }>
  } | null
}

export type GetCategoryDetailsQueryVariables = Exact<{
  categoryId: Scalars['UUID']['input']
}>

export type GetCategoryDetailsQuery = {
  __typename?: 'Query'
  categoriesCollection?: {
    __typename?: 'CategoriesConnection'
    edges: Array<{
      __typename?: 'CategoriesEdge'
      node: { __typename?: 'Categories'; id: any; name: string }
    }>
  } | null
}

export type GetContentQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>
}>

export type GetContentQuery = {
  __typename?: 'Query'
  contentApperitivoCollection?: {
    __typename?: 'ContentApperitivoConnection'
    edges: Array<{
      __typename?: 'ContentApperitivoEdge'
      node: { __typename?: 'ContentApperitivo'; id: any; content?: any | null }
    }>
  } | null
}

export type GetFavouritesQueryVariables = Exact<{ [key: string]: never }>

export type GetFavouritesQuery = {
  __typename?: 'Query'
  profilesRecipesCollection?: {
    __typename?: 'ProfilesRecipesConnection'
    edges: Array<{
      __typename?: 'ProfilesRecipesEdge'
      node: {
        __typename?: 'ProfilesRecipes'
        recipe: { __typename?: 'Recipes'; id: any; name: string; imageUrl?: string | null }
      }
    }>
  } | null
}

export type GetFilterDetailsQueryVariables = Exact<{
  filterId: Scalars['UUID']['input']
}>

export type GetFilterDetailsQuery = {
  __typename?: 'Query'
  categoriesCollection?: {
    __typename?: 'CategoriesConnection'
    edges: Array<{
      __typename?: 'CategoriesEdge'
      node: {
        __typename?: 'Categories'
        id: any
        name: string
        categoriesCollection?: {
          __typename?: 'CategoriesConnection'
          edges: Array<{
            __typename?: 'CategoriesEdge'
            node: { __typename?: 'Categories'; id: any; name: string }
          }>
        } | null
      }
    }>
  } | null
}

export type GetFiltersQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>
}>

export type GetFiltersQuery = {
  __typename?: 'Query'
  categoriesCollection?: {
    __typename?: 'CategoriesConnection'
    edges: Array<{
      __typename?: 'CategoriesEdge'
      node: {
        __typename?: 'Categories'
        id: any
        name: string
        categoriesCollection?: {
          __typename?: 'CategoriesConnection'
          edges: Array<{
            __typename?: 'CategoriesEdge'
            node: { __typename?: 'Categories'; id: any; name: string }
          }>
        } | null
      }
    }>
  } | null
}

export type GetIngredientDetailsQueryVariables = Exact<{
  ingredientId: Scalars['UUID']['input']
}>

export type GetIngredientDetailsQuery = {
  __typename?: 'Query'
  ingredientsCollection?: {
    __typename?: 'IngredientsConnection'
    edges: Array<{
      __typename?: 'IngredientsEdge'
      node: { __typename?: 'Ingredients'; id: any; name: string; description?: string | null }
    }>
  } | null
}

export type GetIngredientsCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type GetIngredientsCategoriesQuery = {
  __typename?: 'Query'
  categoriesCollection?: {
    __typename?: 'CategoriesConnection'
    edges: Array<{
      __typename?: 'CategoriesEdge'
      node: {
        __typename?: 'Categories'
        id: any
        name: string
        ingredientsCategoriesCollection?: {
          __typename?: 'IngredientsCategoriesConnection'
          edges: Array<{
            __typename?: 'IngredientsCategoriesEdge'
            node: {
              __typename?: 'IngredientsCategories'
              ingredient: {
                __typename?: 'Ingredients'
                id: any
                name: string
                profilesIngredientsCollection?: {
                  __typename?: 'ProfilesIngredientsConnection'
                  edges: Array<{
                    __typename?: 'ProfilesIngredientsEdge'
                    node: {
                      __typename?: 'ProfilesIngredients'
                      profile: { __typename?: 'Profiles'; id: any }
                    }
                  }>
                } | null
              }
            }
          }>
        } | null
      }
    }>
  } | null
}

export type GetMyBarQueryVariables = Exact<{ [key: string]: never }>

export type GetMyBarQuery = {
  __typename?: 'Query'
  profilesIngredientsCollection?: {
    __typename?: 'ProfilesIngredientsConnection'
    edges: Array<{
      __typename?: 'ProfilesIngredientsEdge'
      node: {
        __typename?: 'ProfilesIngredients'
        ingredient: {
          __typename?: 'Ingredients'
          id: any
          name: string
          ingredientsCategoriesCollection?: {
            __typename?: 'IngredientsCategoriesConnection'
            edges: Array<{
              __typename?: 'IngredientsCategoriesEdge'
              node: {
                __typename?: 'IngredientsCategories'
                category: { __typename?: 'Categories'; id: any; name: string }
              }
            }>
          } | null
        }
      }
    }>
  } | null
}

export type GetRecipeDetailsQueryVariables = Exact<{
  recipeId: Scalars['UUID']['input']
}>

export type GetRecipeDetailsQuery = {
  __typename?: 'Query'
  recipesCollection?: {
    __typename?: 'RecipesConnection'
    edges: Array<{
      __typename?: 'RecipesEdge'
      node: {
        __typename?: 'Recipes'
        id: any
        name: string
        description?: string | null
        imageUrl?: string | null
        profilesRecipesCollection?: {
          __typename?: 'ProfilesRecipesConnection'
          edges: Array<{
            __typename?: 'ProfilesRecipesEdge'
            node: { __typename?: 'ProfilesRecipes'; profileId: any }
          }>
        } | null
        recipesIngredientsCollection?: {
          __typename?: 'RecipesIngredientsConnection'
          edges: Array<{
            __typename?: 'RecipesIngredientsEdge'
            node: {
              __typename?: 'RecipesIngredients'
              quantity?: number | null
              unit?: { __typename?: 'Units'; id: any; name: string } | null
              ingredient: { __typename?: 'Ingredients'; id: any; name: string }
            }
          }>
        } | null
        stepsCollection?: {
          __typename?: 'StepsConnection'
          edges: Array<{
            __typename?: 'StepsEdge'
            node: { __typename?: 'Steps'; id: any; number: number; description: string }
          }>
        } | null
      }
    }>
  } | null
}

export type GetRecipesCategoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  after?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<RecipesCategoriesFilter>
  orderBy?: InputMaybe<Array<RecipesCategoriesOrderBy> | RecipesCategoriesOrderBy>
}>

export type GetRecipesCategoriesQuery = {
  __typename?: 'Query'
  recipesCategoriesCollection?: {
    __typename?: 'RecipesCategoriesConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      hasPreviousPage: boolean
      endCursor?: string | null
      startCursor?: string | null
    }
    edges: Array<{
      __typename?: 'RecipesCategoriesEdge'
      node: {
        __typename?: 'RecipesCategories'
        recipe: { __typename?: 'Recipes'; name: string; id: any; imageUrl?: string | null }
      }
    }>
  } | null
}

export const AddToFavouritesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addToFavourites' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'profileId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertIntoProfilesRecipesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'recipeId' },
                          value: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
                        },
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'profileId' },
                          value: { kind: 'Variable', name: { kind: 'Name', value: 'profileId' } },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'records' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'recipeId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddToFavouritesMutation, AddToFavouritesMutationVariables>
export const AddToMyBarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addToMyBar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'records' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ProfilesIngredientsInsertInput' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertIntoProfilesIngredientsCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'records' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'records' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'ingredientId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddToMyBarMutation, AddToMyBarMutationVariables>
export const DeleteFromFavouritesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteFromFavourites' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'profileId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteFromProfilesRecipesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'recipeId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'profileId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'profileId' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'atMost' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'records' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'recipeId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteFromFavouritesMutation, DeleteFromFavouritesMutationVariables>
export const DeleteFromMyBarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteFromMyBar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ingredientIds' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'profileIds' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteFromProfilesIngredientsCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ingredientId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'in' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'ingredientIds' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'profileId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'in' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'profileIds' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'atMost' },
                value: { kind: 'IntValue', value: '500' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'records' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'ingredientId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profileId' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteFromMyBarMutation, DeleteFromMyBarMutationVariables>
export const GetCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCategories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'in' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'EnumValue', value: 'DescNullsFirst' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'categoriesCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'imageUrl' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'recipesCategoriesCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'recipe' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'id' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'name' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'imageUrl' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>
export const GetCategoryDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCategoryDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'categoryId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'categoryId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCategoryDetailsQuery, GetCategoryDetailsQueryVariables>
export const GetContentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getContent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'contentApperitivoCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetContentQuery, GetContentQueryVariables>
export const GetFavouritesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getFavourites' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profilesRecipesCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'recipe' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFavouritesQuery, GetFavouritesQueryVariables>
export const GetFilterDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getFilterDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'filterId' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'categoriesCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFilterDetailsQuery, GetFilterDetailsQueryVariables>
export const GetFiltersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getFilters' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'in' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'EnumValue', value: 'DescNullsFirst' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'categoriesCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFiltersQuery, GetFiltersQueryVariables>
export const GetIngredientDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getIngredientDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ingredientId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingredientsCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'ingredientId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetIngredientDetailsQuery, GetIngredientDetailsQueryVariables>
export const GetIngredientsCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getIngredientsCategories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ingredientsCategoriesCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'ingredient' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'id' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'name' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'profilesIngredientsCollection',
                                                      },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'edges' },
                                                            selectionSet: {
                                                              kind: 'SelectionSet',
                                                              selections: [
                                                                {
                                                                  kind: 'Field',
                                                                  name: {
                                                                    kind: 'Name',
                                                                    value: 'node',
                                                                  },
                                                                  selectionSet: {
                                                                    kind: 'SelectionSet',
                                                                    selections: [
                                                                      {
                                                                        kind: 'Field',
                                                                        name: {
                                                                          kind: 'Name',
                                                                          value: 'profile',
                                                                        },
                                                                        selectionSet: {
                                                                          kind: 'SelectionSet',
                                                                          selections: [
                                                                            {
                                                                              kind: 'Field',
                                                                              name: {
                                                                                kind: 'Name',
                                                                                value: 'id',
                                                                              },
                                                                            },
                                                                          ],
                                                                        },
                                                                      },
                                                                    ],
                                                                  },
                                                                },
                                                              ],
                                                            },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetIngredientsCategoriesQuery, GetIngredientsCategoriesQueryVariables>
export const GetMyBarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getMyBar' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profilesIngredientsCollection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ingredient' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'ingredientsCategoriesCollection',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'edges' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'category' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'id' },
                                                          },
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'name' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMyBarQuery, GetMyBarQueryVariables>
export const GetRecipeDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getRecipeDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UUID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'recipeId' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'profilesRecipesCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'profileId' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'recipesIngredientsCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'quantity' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'unit' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'id' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'name' },
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'ingredient' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'id' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'name' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stepsCollection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'number' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'description' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>
export const GetRecipesCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getRecipesCategories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Cursor' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Cursor' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'RecipesCategoriesFilter' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'RecipesCategoriesOrderBy' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipesCategoriesCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'recipe' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRecipesCategoriesQuery, GetRecipesCategoriesQueryVariables>
