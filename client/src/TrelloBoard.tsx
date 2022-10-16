/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { CardEditor } from "./CardEditor";
import { nonNullArray } from "./nonNullArray";
import { useGetSearchResultQuery } from "./generated/graphql";
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
    controlVariable @client {
      ... on CardAddInitiated {
        listId
        inputText
      }
      ... on CardDragged {
        listId
        cardId
        overlaidCardId
      }
      ... on ListDragged {
        listId
      }
      ... on CardDetailOpened {
        cardId
      }
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

  const lists = data.lists ? nonNullArray(data.lists) : [];

  return (
    <>
      {data.editScreenCardId !== null && data.editScreenCardId !== "" ? (
        <CardEditor cardId={data.editScreenCardId} />
      ) : (
        <></>
      )}
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
