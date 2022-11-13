/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import {
  ChangeEventHandler,
  DragEventHandler,
  useContext,
  useEffect,
  useRef,
} from "react";
import { controlVariable } from "./cache";
import { CardComponent } from "./CardComponent";
import { ControlContext } from "./context";
import {
  ListComponentFragment,
  useAddCardToListMutation,
  useMoveCardToEmptyListMutation,
  useSwapListsMutation,
} from "./generated/graphql";
import { nonNullArray } from "./nonNullArray";

export interface ListComponentProps {
  fragment: ListComponentFragment;
}

gql`
  mutation addCardToList($listId: ID!, $title: String!) {
    addCardToList(listId: $listId, card: { title: $title })
  }
`;

gql`
  mutation swapLists($list1Id: ID!, $list2Id: ID!) {
    swapLists(list1Id: $list1Id, list2Id: $list2Id)
  }
`;

gql`
  mutation moveCardToEmptyList($fromListId: ID!, $toListId: ID!, $cardId: ID!) {
    moveCardToEmptyList(
      fromListId: $fromListId
      toListId: $toListId
      cardId: $cardId
    )
  }
`;

export const ListComponent = ({ fragment }: ListComponentProps) => {
  const currentControl = useContext(ControlContext);
  const el = useRef<HTMLInputElement>(null);
  const [addCardToList] = useAddCardToListMutation({
    refetchQueries: ["GetSearchResult"],
  });
  const [swapListsMutation] = useSwapListsMutation({
    refetchQueries: ["GetSearchResult"],
  });
  const [moveCardToEmptyListMutation] = useMoveCardToEmptyListMutation({
    refetchQueries: ["GetSearchResult"],
  });
  useEffect(() => {
    if (el.current) {
      el.current.focus();
    }
  });

  const showInput =
    currentControl?.__typename === "CardAddInitiated" &&
    currentControl.listId === fragment.id;

  const cards = fragment.cards ? nonNullArray(fragment.cards) : [];

  // background color
  const determineBackgroundColor = () => {
    const defaultColor = "#cecece";
    const draggedColor = "#654e83";
    const overlaidColor = "#80dbff";

    if (currentControl?.__typename === "ListDragged") {
      const thisListId = fragment.id;
      const draggedListId = currentControl.listId;
      const overlaidListId = currentControl.overlaidListId;

      if (thisListId === draggedListId) return draggedColor;
      else if (thisListId === overlaidListId) return overlaidColor;
      else return defaultColor;
    } else if (currentControl?.__typename === "CardDraggedOverList") {
      const thisListId = fragment.id;
      const overlaidListId = currentControl.overlaidListId;

      if (thisListId === overlaidListId) return overlaidColor;
      else return defaultColor;
    } else {
      return defaultColor;
    }
  };
  const backgroundColor = determineBackgroundColor();

  const confirmCardAdd = () => {
    if (currentControl?.__typename === "CardAddInitiated") {
      addCardToList({
        variables: {
          listId: currentControl.listId,
          title: currentControl.inputText,
        },
      });
      controlVariable(null);
    }
  };

  const initiateCardAdd = () => {
    controlVariable({
      __typename: "CardAddInitiated",
      listId: fragment.id,
      inputText: "",
    });
  };

  const clearCardAdding = () => {
    controlVariable(null);
  };

  const asTyped: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (currentControl?.__typename === "CardAddInitiated") {
      controlVariable({
        __typename: "CardAddInitiated",
        listId: currentControl.listId,
        inputText: event.target.value,
      });
    }
  };

  const inputText =
    currentControl?.__typename === "CardAddInitiated"
      ? currentControl.inputText
      : "";

  const startListDragged = () => {
    controlVariable({
      __typename: "ListDragged",
      listId: fragment.id,
      overlaidListId: null,
    });
  };

  const leaveListDragged = () => {
    if (currentControl?.__typename === "ListDragged") {
      controlVariable({
        __typename: "ListDragged",
        listId: currentControl.listId,
        overlaidListId: null,
      });
    }
  };

  const clearListDragged = () => {
    controlVariable(null);
  };

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation(); //necessary not to trigger Outer component's event handler
    console.log("handleDragStart ListComponent");
    startListDragged();
  };
  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation(); //necessary not to trigger Outer component's event handler
    console.log("handleDragEnd ListComponent");
    clearListDragged();
  };
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation(); //necessary not to trigger Outer component's event handler
    console.log("handleDragEnter ListComponent");
    if (currentControl?.__typename === "ListDragged") {
      console.log("printing fragment id:", fragment.id);
      controlVariable({
        __typename: "ListDragged",
        listId: currentControl.listId,
        overlaidListId: fragment.id,
      });
    } else if (
      currentControl?.__typename === "CardDragged" ||
      currentControl?.__typename === "CardDraggedOverCard" ||
      currentControl?.__typename === "CardDraggedOverList"
    ) {
      if (currentControl.listId !== fragment.id) {
        controlVariable({
          __typename: "CardDraggedOverList",
          cardId: currentControl.cardId,
          listId: currentControl.listId,
          overlaidListId: fragment.id,
        });
      }
    }
  };
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    console.log("handleDragLeave ListComponent");
    leaveListDragged();
  };
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e: any) => {
    console.log("handleDragOver ListComponent");
    e.preventDefault(); // necessary for onDrag to fire
    if (currentControl?.__typename === "ListDragged") {
      console.log("printing fragment id:", fragment.id);
      controlVariable({
        __typename: "ListDragged",
        listId: currentControl.listId,
        overlaidListId: fragment.id,
      });
    } else if (
      currentControl?.__typename === "CardDragged" ||
      currentControl?.__typename === "CardDraggedOverCard" ||
      currentControl?.__typename === "CardDraggedOverList"
    ) {
      if (currentControl.listId !== fragment.id) {
        controlVariable({
          __typename: "CardDraggedOverList",
          cardId: currentControl.cardId,
          listId: currentControl.listId,
          overlaidListId: fragment.id,
        });
      }
    }
  };
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault(); // necessary for onDrag to fire
    e.stopPropagation(); //necessary not to trigger Outer component's event handler
    if (currentControl?.__typename === "ListDragged") {
      //dragged list
      const draggedListId = currentControl.listId;
      //this card and its list
      const thisListId = fragment.id;

      swapListsMutation({
        variables: {
          list1Id: thisListId,
          list2Id: draggedListId,
        },
      });
    } else if (currentControl?.__typename === "CardDraggedOverList") {
      //dragged card list
      const draggedCardId = currentControl.cardId;
      const draggedListId = currentControl.listId;
      //this  list
      const thisListId = fragment.id;

      moveCardToEmptyListMutation({
        variables: {
          fromListId: draggedListId,
          toListId: thisListId,
          cardId: draggedCardId,
        },
      });
    }
  };

  return (
    <div
      css={css`
        width: 300px;
        background-color: ${backgroundColor};
        padding: 10px;
      `}
      // TODO: probably draggable should be conditional on current controlVariable
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div>{fragment.title}</div>
      {cards.map((c, index) => (
        <CardComponent key={index} fragment={c} listId={fragment.id} />
      ))}

      {showInput ? (
        <div>
          <form
          // React's onBlur bubbles, so it is more like HTML focusout rather than HTML blur. See https://reactjs.org/docs/events.html#focus-events
          // onBlur={clearCardAdding}
          >
            <input
              ref={el}
              type="text"
              onChange={asTyped}
              value={inputText ? inputText : ""}
            />
            <button type="button" onClick={clearCardAdding}>
              x
            </button>
            <button type="button" onClick={confirmCardAdd}>
              confirm a new card
            </button>
          </form>
        </div>
      ) : (
        <button onClick={initiateCardAdd}>+ new card</button>
      )}
    </div>
  );
};

ListComponent.fragment = gql`
  fragment ListComponent on List {
    id
    title
    maxNumCards
    cards {
      ...CardComponent
    }
  }
`;
