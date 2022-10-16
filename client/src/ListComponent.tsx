/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { ChangeEventHandler, useEffect, useRef } from "react";
import { controlVariable } from "./cache";
import { CardComponent } from "./CardComponent";
import {
  ListComponentFragment,
  useAddCardToListMutation,
} from "./generated/graphql";
import { nonNullArray } from "./nonNullArray";

export interface ListComponentProps {
  fragment: ListComponentFragment;
  overlaidCardId: string | null;
  draggedListId: string | null;
  draggedCardId: string | null;
}

gql`
  mutation addCardToList($listId: ID!, $title: String!) {
    addCardToList(listId: $listId, card: { title: $title })
  }
`;

export const ListComponent = ({
  fragment,
  overlaidCardId,
  draggedListId,
  draggedCardId,
}: ListComponentProps) => {
  const el = useRef<HTMLInputElement>(null);
  const [addCardToList] = useAddCardToListMutation({
    refetchQueries: ["GetSearchResult"],
  });
  //TODO: should be from useContext()?
  const currentControl = controlVariable();
  const showInput =
    currentControl?.__typename === "CardAddInitiated" &&
    currentControl.listId === fragment.id;

  useEffect(() => {
    if (el.current) {
      el.current.focus();
    }
  });

  const cards = fragment.cards ? nonNullArray(fragment.cards) : [];

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

  return (
    <div
      css={css`
        width: 300px;
        background-color: #cecece;
        padding: 10px;
      `}
    >
      <div>{fragment.title}</div>
      {cards.map((c, index) => (
        <CardComponent
          key={index}
          fragment={c}
          listId={fragment.id}
          overlaidCardId={overlaidCardId}
          draggedListId={draggedListId}
          draggedCardId={draggedCardId}
        />
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
