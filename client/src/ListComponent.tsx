/** @jsxImportSource @emotion/react */
import { gql, useMutation } from "@apollo/client";
import { css } from "@emotion/react";
import {
  Card,
  CardComponentFragment,
  ListComponentFragment,
  useAddCardToListMutation,
} from "./generated/graphql";
import { CardComponent } from "./CardComponent";
import { excludeNullFromArray } from "./excludeNullFromArray";
import { cardAdding } from "./cache";
import { ChangeEventHandler, useEffect, useRef } from "react";

export interface ListComponentProps {
  fragment: ListComponentFragment;
  showInput: boolean;
}

gql`
  mutation addCardToList {
    addCardToList(listId: "l-2", card: { title: "cardTitle" })
  }
`;

export const ListComponent = ({ fragment, showInput }: ListComponentProps) => {
  const [addCardToList, { data, loading, error }] = useAddCardToListMutation({
    refetchQueries: ["GetSearchResult"],
  });
  const el = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (el.current) {
      el.current.focus();
    }
  });

  const cards = fragment.cards
    ? excludeNullFromArray<CardComponentFragment>(fragment.cards)
    : [];

  const addCard = () => {
    console.log("adding a card");
    addCardToList();
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
          <div>
            <input
              ref={el}
              type="text"
              onBlur={clearCardAdding}
              onChange={asTyped}
              value={inputText ? inputText : ""}
            />
          </div>
          <button>really add a card</button>
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
