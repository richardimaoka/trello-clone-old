/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { DragEventHandler, useContext } from "react";
import { controlVariable } from "./cache";
import { ControlContext } from "./context";
import {
  CardComponentFragment,
  useSwapCardsBetweenListsMutation,
  useSwapCardsWithinListMutation,
} from "./generated/graphql";

export interface CardComponentProps {
  fragment: CardComponentFragment;
  listId: string;
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

export const CardComponent = ({ fragment, listId }: CardComponentProps) => {
  // hooks
  const currentControl = useContext(ControlContext);
  const [swapCardWithinList] = useSwapCardsWithinListMutation({
    refetchQueries: ["GetSearchResult"],
  });
  const [swapCardsBetweenLists] = useSwapCardsBetweenListsMutation({
    refetchQueries: ["GetSearchResult"],
  });

  // background color
  const determineBackgroundColor = () => {
    const defaultColor = "#ffffff";
    const draggedColor = "#6d6060";
    const overlaiedColor = "#80dbff";

    if (currentControl?.__typename === "CardDragged") {
      const thisCardId = fragment.id;
      const draggedCardId = currentControl.cardId;
      const overlaidCardId = currentControl.overlaidCardId;

      if (thisCardId === draggedCardId) return draggedColor;
      else if (thisCardId === overlaidCardId) return overlaiedColor;
      else return defaultColor;
    } else {
      return defaultColor;
    }
  };
  const backgroundColor = determineBackgroundColor();

  // event handlers
  const startCardDragged = () => {
    controlVariable({
      __typename: "CardDragged",
      cardId: fragment.id,
      listId: listId,
      overlaidCardId: null,
    });
  };

  const clearCardDragged = () => {
    controlVariable(null);
  };

  const overlayCard = () => {
    if (currentControl?.__typename === "CardDragged") {
      controlVariable({
        __typename: "CardDragged",
        cardId: currentControl.cardId,
        listId: currentControl.listId,
        overlaidCardId: fragment.id,
      });
    }
  };

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation(); //necessary not to trigger Outer component's event handler
    startCardDragged();
  };
  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    clearCardDragged();
  };
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    overlayCard();
  };
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault(); // necessary for onDrag to fire
  };
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault(); // necessary for onDrag to fire
    swapCards();
  };

  const swapCards = () => {
    if (currentControl?.__typename !== "CardDragged") return;

    //dragged card and its list
    const draggedCardListId = currentControl.listId;
    const draggedCardId = currentControl.cardId;
    //this card and its list
    const thisListId = listId;
    const thisCardId = fragment.id;

    if (draggedCardListId === thisListId) {
      swapCardWithinList({
        variables: {
          listId: thisListId,
          card1Id: draggedCardId,
          card2Id: thisCardId,
        },
      });
    } else {
      swapCardsBetweenLists({
        variables: {
          list1Id: draggedCardListId,
          card1Id: draggedCardId,
          list2Id: thisListId,
          card2Id: thisCardId,
        },
      });
    }
  };

  const launchEditScreen = () => {
    controlVariable({ __typename: "CardDetailOpened", cardId: fragment.id });
  };

  return (
    <div
      data-card-id={fragment.id}
      // TODO: probably draggable should be conditional on current controlVariable
      draggable={true}
      css={css`
        padding: 10px;
        background-color: ${backgroundColor};
        margin: 5px 0px;
      `}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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
