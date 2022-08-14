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

export type Employee = {
  __typename?: "Employee";
  department: Maybe<Scalars["String"]>;
  jobTitle: Maybe<Scalars["String"]>;
  name: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  hello: Maybe<Scalars["String"]>;
  search: Maybe<Array<Maybe<Employee>>>;
};

export type QuerySearchArgs = {
  department: InputMaybe<Scalars["String"]>;
};

export type EmployeeComponentFragment = {
  __typename?: "Employee";
  name: string | null;
  jobTitle: string | null;
  department: string | null;
};

export type GetSearchResultQueryVariables = Exact<{ [key: string]: never }>;

export type GetSearchResultQuery = {
  __typename?: "Query";
  search: Array<{
    __typename?: "Employee";
    name: string | null;
    jobTitle: string | null;
    department: string | null;
  } | null> | null;
};

export const EmployeeComponentFragmentDoc = gql`
  fragment EmployeeComponent on Employee {
    name
    jobTitle
    department
  }
`;
export const GetSearchResultDocument = gql`
  query GetSearchResult {
    search {
      ...EmployeeComponent
    }
  }
  ${EmployeeComponentFragmentDoc}
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
