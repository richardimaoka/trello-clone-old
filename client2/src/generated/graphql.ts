import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Card = {
  __typename?: "Card";
  description: Maybe<Scalars["String"]>;
  labels: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Maybe<Scalars["String"]>;
};

export type List = {
  __typename?: "List";
  cards: Maybe<Array<Maybe<Card>>>;
  maxNumCards: Maybe<Scalars["Int"]>;
  title: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  cartItems: Maybe<Array<Maybe<Scalars["Int"]>>>;
  lists: Maybe<Array<Maybe<List>>>;
};

export type GetCartItemsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCartItemsQuery = {
  __typename?: "Query";
  cartItems: Array<number | null> | null;
};

export const GetCartItemsDocument = gql`
  query GetCartItems {
    cartItems @client
  }
`;

/**
 * __useGetCartItemsQuery__
 *
 * To run a query within a React component, call `useGetCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCartItemsQuery,
    GetCartItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCartItemsQuery, GetCartItemsQueryVariables>(
    GetCartItemsDocument,
    options
  );
}
export function useGetCartItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCartItemsQuery,
    GetCartItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCartItemsQuery, GetCartItemsQueryVariables>(
    GetCartItemsDocument,
    options
  );
}
export type GetCartItemsQueryHookResult = ReturnType<
  typeof useGetCartItemsQuery
>;
export type GetCartItemsLazyQueryHookResult = ReturnType<
  typeof useGetCartItemsLazyQuery
>;
export type GetCartItemsQueryResult = Apollo.QueryResult<
  GetCartItemsQuery,
  GetCartItemsQueryVariables
>;
