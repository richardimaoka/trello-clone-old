/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { CardEditor } from "./CardEditor";
import { excludeNullFromArray } from "./excludeNullFromArray";
import {
  ListComponentFragment,
  useGetSearchResultQuery,
} from "./generated/graphql";
import { ListComponent } from "./ListComponent";

//const QUERY = gql`...` will cause `'QUERY' is declared but its value is never read`
gql`
  query GetSearchResult {
    draggedCardId @client
    draggedListId @client
    overlaidCardId @client
    editScreenCardId @client
    cardAdding @client {
      listId
      inputText
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
      {data.editScreenCardId !== "" ? <CardEditor /> : <></>}
      <div
        css={css`
          display: flex;
          column-gap: 10px;
        `}
      >
        {lists.map((l, index) => (
          <ListComponent
            key={index}
            fragment={l}
            overlaidCardId={data.overlaidCardId}
            draggedListId={data.draggedListId}
            draggedCardId={data.draggedCardId}
            showInput={data.cardAdding?.listId === l.id}
          />
        ))}
      </div>
    </>
  );
};
