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

export type CardAdding = {
  __typename?: "CardAdding";
  inputText: Maybe<Scalars["String"]>;
  listId: Maybe<Scalars["ID"]>;
};

export type CardInput = {
  description: InputMaybe<Scalars["String"]>;
  title: InputMaybe<Scalars["String"]>;
};

export type List = {
  __typename?: "List";
  cards: Maybe<Array<Maybe<Card>>>;
  id: Scalars["ID"];
  maxNumCards: Maybe<Scalars["Int"]>;
  title: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addCardToList: Maybe<Scalars["Int"]>;
};

export type MutationAddCardToListArgs = {
  card: CardInput;
  listId: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  cardAdding: Maybe<CardAdding>;
  cartItems: Maybe<Array<Maybe<Scalars["Int"]>>>;
  draggedCardId: Maybe<Scalars["ID"]>;
  lists: Maybe<Array<Maybe<List>>>;
  overlaidCardId: Maybe<Scalars["ID"]>;
};

export type CardComponentFragment = {
  __typename?: "Card";
  id: string;
  title: string | null;
  description: string | null;
  labels: Array<string | null> | null;
};

export type AddCardToListMutationVariables = Exact<{
  listId: Scalars["ID"];
  title: Scalars["String"];
}>;

export type AddCardToListMutation = {
  __typename?: "Mutation";
  addCardToList: number | null;
};

export type ListComponentFragment = {
  __typename?: "List";
  id: string;
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
  draggedCardId: string | null;
  cardAdding: {
    __typename?: "CardAdding";
    listId: string | null;
    inputText: string | null;
  } | null;
  lists: Array<{
    __typename?: "List";
    id: string;
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
    id
    title
    maxNumCards
    cards {
      ...CardComponent
    }
  }
  ${CardComponentFragmentDoc}
`;
export const AddCardToListDocument = gql`
  mutation addCardToList($listId: ID!, $title: String!) {
    addCardToList(listId: $listId, card: { title: $title })
  }
`;
export type AddCardToListMutationFn = Apollo.MutationFunction<
  AddCardToListMutation,
  AddCardToListMutationVariables
>;

/**
 * __useAddCardToListMutation__
 *
 * To run a mutation, you first call `useAddCardToListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCardToListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCardToListMutation, { data, loading, error }] = useAddCardToListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddCardToListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCardToListMutation,
    AddCardToListMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddCardToListMutation,
    AddCardToListMutationVariables
  >(AddCardToListDocument, options);
}
export type AddCardToListMutationHookResult = ReturnType<
  typeof useAddCardToListMutation
>;
export type AddCardToListMutationResult =
  Apollo.MutationResult<AddCardToListMutation>;
export type AddCardToListMutationOptions = Apollo.BaseMutationOptions<
  AddCardToListMutation,
  AddCardToListMutationVariables
>;
export const GetSearchResultDocument = gql`
  query GetSearchResult {
    draggedCardId @client
    cardAdding @client {
      listId
      inputText
    }
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
