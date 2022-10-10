/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { excludeNullFromArray } from "./excludeNullFromArray";
import {
  ListComponentFragment,
  useGetSearchResultQuery,
} from "./generated/graphql";
import { ListComponent } from "./ListComponent";

//This is read by GraphQL codegen to generate types
const QUERY = gql`
  query GetSearchResult {
    draggedCard @client
    cardAdding @client {
      listId
    }
    lists {
      ...ListComponent
    }
  }
`;

export const TrelloBoard = () => {
  const { loading, error, data } = useGetSearchResultQuery();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error happened {error.message}</div>;
  if (!data) return <div>error happened empty data</div>;

  const lists = data.lists
    ? excludeNullFromArray<ListComponentFragment>(data.lists)
    : [];

  return (
    <>
      <div>{data.draggedCard}</div>
      <div
        css={css`
          display: flex;
          column-gap: 10px;
        `}
      >
        {lists.map((l, index) => (
          <ListComponent key={index} fragment={l} disableAddCard={true} />
        ))}
      </div>
    </>
  );
};
