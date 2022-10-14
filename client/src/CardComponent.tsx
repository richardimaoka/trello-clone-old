/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { DragEventHandler } from "react";
import {
  draggedCardId as makeDraggedCardId,
  draggedListId as makeDraggedListId,
  overlaidCardId as makeOverlaidCardId,
  editScreenCardId as makeEditScreenCardId,
} from "./cache";
import {
  CardComponentFragment,
  useSwapCardsBetweenListsMutation,
  useSwapCardsWithinListMutation,
} from "./generated/graphql";

export interface CardComponentProps {
  fragment: CardComponentFragment;
  listId: string;
  overlaidCardId: string | null;
  draggedListId: string | null;
  draggedCardId: string | null;
}

gql`
  mutation swapCardsWithinList($listId: ID!, $card1Id: ID!, $card2Id: ID!) {
    swapCardsWithinList(listId: $listId, card1Id: $card1Id, card2Id: $card2Id)
  }
`;

gql`
  mutation swapCardsBetweenLists(
    $list1Id: ID!
    $list2Id: ID!
    $card1Id: ID!
    $card2Id: ID!
  ) {
    swapCardsBetweenLists(
      list1Id: $list1Id
      list2Id: $list2Id
      card1Id: $card1Id
      card2Id: $card2Id
    )
  }
`;

export const CardComponent = ({
  fragment,
  listId,
  overlaidCardId,
  draggedListId,
  draggedCardId,
}: CardComponentProps) => {
  const [swapCardWithinList] = useSwapCardsWithinListMutation({
    refetchQueries: ["GetSearchResult"],
  });
  const [swapCardsBetweenLists] = useSwapCardsBetweenListsMutation({
    refetchQueries: ["GetSearchResult"],
  });

  const backgroundColor =
    fragment.id === draggedCardId
      ? "#6d6060"
      : fragment.id === overlaidCardId
      ? "#80dbff"
      : "#ffffff";

  const setDragged = () => {
    makeDraggedCardId(fragment.id);
    makeDraggedListId(listId);
  };
  const clearDragAndOverlay = () => {
    makeDraggedCardId("");
    makeDraggedListId("");
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
    const list1Id = draggedListId;
    const list2Id = listId;
    const card1Id = draggedCardId;
    const card2Id = fragment.id;

    if (list1Id === list2Id) {
      if (!card1Id) {
        console.log("swap nothing as card1Id =", card1Id);
        return;
      }

      swapCardWithinList({
        variables: { listId: listId, card1Id: card1Id, card2Id: card2Id },
      });
    } else {
      if (!list1Id) {
        console.log("swap nothing as list1Id =", list1Id);
        return;
      }
      if (!card1Id) {
        console.log("swap nothing as card1Id =", card1Id);
        return;
      }
      swapCardsBetweenLists({
        variables: {
          list1Id: list1Id,
          list2Id: list2Id,
          card1Id: card1Id,
          card2Id: card2Id,
        },
      });
    }
  };
  const launchEditScreen = () => {
    makeEditScreenCardId(fragment.id);
    alert("edit screen");
  };
  return (
    <div
      data-card-id={fragment.id}
      draggable={true}
      css={css`
        padding: 10px;
        background-color: ${backgroundColor};
      `}
      onDragStart={setDragged}
      onDragEnd={clearDragAndOverlay}
      onDragEnter={setOverlaidCardId}
      onDragOver={handleDragOver}
      onDrop={swapCards}
      onClick={launchEditScreen}
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
