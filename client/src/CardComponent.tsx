/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { DragEventHandler } from "react";
import {
  draggedCardId as makeDraggedCardId,
  overlaidCardId as makeOverlaidCardId,
} from "./cache";
import {
  CardComponentFragment,
  useSwapCardsWithinListMutation,
} from "./generated/graphql";
export interface CardComponentProps {
  fragment: CardComponentFragment;
  listId: string;
  overlaidCardId: string | null;
  draggedCardId: string | null;
}

gql`
  mutation swapCardsWithinList($listId: ID!, $card1Id: ID!, $card2Id: ID!) {
    swapCardsWithinList(listId: $listId, card1Id: $card1Id, card2Id: $card2Id)
  }
`;

export const CardComponent = ({
  fragment,
  listId,
  overlaidCardId,
  draggedCardId,
}: CardComponentProps) => {
  const [swapCardWithinList] = useSwapCardsWithinListMutation({
    refetchQueries: ["GetSearchResult"],
  });

  const backgroundColor =
    fragment.id === draggedCardId
      ? "#6d6060"
      : fragment.id === overlaidCardId
      ? "#80dbff"
      : "#ffffff";

  const setDraggedCardId = () => {
    makeDraggedCardId(fragment.id);
  };
  const clearDragAndOverlay = () => {
    makeDraggedCardId("");
    makeOverlaidCardId("");
  };
  const setOverlaidCardId: DragEventHandler<HTMLDivElement> = (e) => {
    if (fragment.id !== draggedCardId) {
      makeOverlaidCardId(fragment.id);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault(); //this is necessary for onDrag to fire
  };
  const swapCards = (e: any) => {
    const card1Id = draggedCardId;
    const card2Id = fragment.id;

    if (!card1Id) {
      console.log(`draggedCardId is ${draggedCardId}`);
      return;
    }

    swapCardWithinList({
      variables: { listId: listId, card1Id: card1Id, card2Id: card2Id },
    });
  };

  return (
    <div
      data-card-id={fragment.id}
      draggable={true}
      css={css`
        padding: 10px;
        background-color: ${backgroundColor};
      `}
      onDragStart={setDraggedCardId}
      onDragEnd={clearDragAndOverlay}
      onDragEnter={setOverlaidCardId}
      onDragOver={handleDragOver}
      onDrop={swapCards}
    >
      <div>{fragment.title}</div>
    </div>
  );
};

CardComponent.fragment = gql`
  fragment CardComponent on Card {
    id
    title
    description
    labels
  }
`;
