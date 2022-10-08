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
  id: Scalars["ID"];
  labels: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Maybe<Scalars["String"]>;
};

export type List = {
  __typename?: "List";
  cards: Maybe<Array<Maybe<Card>>>;
  id: Scalars["ID"];
  maxNumCards: Maybe<Scalars["Int"]>;
  title: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  cartItems: Maybe<Array<Maybe<Scalars["Int"]>>>;
  draggedCard: Maybe<Scalars["ID"]>;
  lists: Maybe<Array<Maybe<List>>>;
};

export type CardComponentFragment = {
  __typename?: "Card";
  id: string;
  title: string | null;
  description: string | null;
  labels: Array<string | null> | null;
};

export type ListComponentFragment = {
  __typename?: "List";
  title: string | null;
  maxNumCards: number | null;
  cards: Array<{
    __typename?: "Card";
    id: string;
    title: string | null;
    description: string | null;
    labels: Array<string | null> | null;
  } | null> | null;
};

export type GetSearchResultQueryVariables = Exact<{ [key: string]: never }>;

export type GetSearchResultQuery = {
  __typename?: "Query";
  draggedCard: string | null;
  lists: Array<{
    __typename?: "List";
    title: string | null;
    maxNumCards: number | null;
    cards: Array<{
      __typename?: "Card";
      id: string;
      title: string | null;
      description: string | null;
      labels: Array<string | null> | null;
    } | null> | null;
  } | null> | null;
};

export const CardComponentFragmentDoc = gql`
  fragment CardComponent on Card {
    id
    title
    description
    labels
  }
`;
export const ListComponentFragmentDoc = gql`
  fragment ListComponent on List {
    title
    maxNumCards
    cards {
      ...CardComponent
    }
  }
  ${CardComponentFragmentDoc}
`;
export const GetSearchResultDocument = gql`
  query GetSearchResult {
    draggedCard @client
    lists {
      ...ListComponent
    }
  }
  ${ListComponentFragmentDoc}
`;

/**
 * __useGetSearchResultQuery__
 *
 * To run a query within a React component, call `useGetSearchResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchResultQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSearchResultQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSearchResultQuery,
    GetSearchResultQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSearchResultQuery, GetSearchResultQueryVariables>(
    GetSearchResultDocument,
    options
  );
}
export function useGetSearchResultLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSearchResultQuery,
    GetSearchResultQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSearchResultQuery,
    GetSearchResultQueryVariables
  >(GetSearchResultDocument, options);
}
export type GetSearchResultQueryHookResult = ReturnType<
  typeof useGetSearchResultQuery
>;
export type GetSearchResultLazyQueryHookResult = ReturnType<
  typeof useGetSearchResultLazyQuery
>;
export type GetSearchResultQueryResult = Apollo.QueryResult<
  GetSearchResultQuery,
  GetSearchResultQueryVariables
>;
