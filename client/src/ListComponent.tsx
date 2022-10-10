/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { ChangeEventHandler, useEffect, useRef } from "react";
import { cardAdding } from "./cache";
import { CardComponent } from "./CardComponent";
import { excludeNullFromArray } from "./excludeNullFromArray";
import {
  CardComponentFragment,
  ListComponentFragment,
  useAddCardToListMutation,
} from "./generated/graphql";

export interface ListComponentProps {
  fragment: ListComponentFragment;
  showInput: boolean;
}

gql`
  mutation addCardToList($listId: ID!, $title: String!) {
    addCardToList(listId: $listId, card: { title: $title })
  }
`;

export const ListComponent = ({ fragment, showInput }: ListComponentProps) => {
  const el = useRef<HTMLInputElement>(null);
  const [addCardToList, { data, loading, error }] = useAddCardToListMutation({
    refetchQueries: ["GetSearchResult"],
  });

  useEffect(() => {
    if (el.current) {
      el.current.focus();
    }
  });

  const cards = fragment.cards
    ? excludeNullFromArray<CardComponentFragment>(fragment.cards)
    : [];

  const reallyAddCard = () => {
    const ca = cardAdding();
    if (ca?.listId && ca.inputText) {
      addCardToList({ variables: { listId: ca.listId, title: ca.inputText } });
      cardAdding(null);
    }
  };

  const addingCardOnClick = () => {
    cardAdding({ listId: fragment.id, inputText: "" });
  };

  const clearCardAdding = () => {
    cardAdding(null);
  };

  const asTyped: ChangeEventHandler<HTMLInputElement> = (event) => {
    const ca = cardAdding();
    if (ca?.listId) {
      cardAdding({ listId: ca?.listId, inputText: event.target.value });
    }
  };

  const inputText = cardAdding()?.inputText;

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
        <CardComponent key={index} fragment={c} />
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
            <button type="button" onClick={reallyAddCard}>
              really add a card
            </button>
          </form>
        </div>
      ) : (
        <button onClick={addingCardOnClick}>Add a card</button>
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
