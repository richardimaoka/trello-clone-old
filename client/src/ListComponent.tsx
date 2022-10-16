/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { ChangeEventHandler, useContext, useEffect, useRef } from "react";
import { controlVariable } from "./cache";
import { CardComponent } from "./CardComponent";
import { ControlContext } from "./context";
import {
  ListComponentFragment,
  useAddCardToListMutation,
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

export const ListComponent = ({ fragment }: ListComponentProps) => {
  const currentControl = useContext(ControlContext);
  const el = useRef<HTMLInputElement>(null);
  const [addCardToList] = useAddCardToListMutation({
    refetchQueries: ["GetSearchResult"],
  });

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

  const handleDragOver = (e: any) => {
    e.preventDefault(); // necessary for onDrag to fire
    e.stopPropagation(); //necessary not to trigger Outer component's event handler
    console.log("handleDragOver ListComponent", fragment.id);
  };

  return (
    <div
      css={css`
        width: 300px;
        background-color: #cecece;
        padding: 10px;
      `}
      draggable={true}
      onDragOver={handleDragOver}
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
