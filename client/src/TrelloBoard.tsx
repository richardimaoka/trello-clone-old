/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { CardEditor } from "./CardEditor";
import { ControlContext } from "./context";
import { useGetSearchResultQuery } from "./generated/graphql";
import { ListComponent } from "./ListComponent";
import { nonNullArray } from "./nonNullArray";

//const QUERY = gql`...` will cause `'QUERY' is declared but its value is never read`
gql`
  query GetSearchResult {
    controlVariable @client {
      ... on CardAddInitiated {
        listId
        inputText
      }
      ... on CardDragged {
        listId
        cardId
      }
      ... on CardDraggedOverCard {
        listId
        cardId
        overlaidCardId
      }
      ... on ListDragged {
        listId
        overlaidListId
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
    <ControlContext.Provider value={data.controlVariable}>
      {data.controlVariable?.__typename === "CardDetailOpened" ? (
        <CardEditor cardId={data.controlVariable.cardId} />
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
          <ListComponent key={index} fragment={l} />
        ))}
      </div>
    </ControlContext.Provider>
  );
};
