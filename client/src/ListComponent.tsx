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

export interface ListComponentProps {
  fragment: ListComponentFragment;
}

gql`
  mutation addCardToList {
    addCardToList(listId: "l-2", card: { title: "cardTitle" })
  }
`;

export const ListComponent = ({ fragment }: ListComponentProps) => {
  const [addCardToList, { data, loading, error }] = useAddCardToListMutation({
    refetchQueries: ["GetSearchResult"],
  });
  const cards = fragment.cards
    ? excludeNullFromArray<CardComponentFragment>(fragment.cards)
    : [];

  const addCard = () => {
    console.log("adding a card");
    addCardToList();
  };

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
      <button onClick={addCard}>Add a card</button>
    </div>
  );
};

ListComponent.fragment = gql`
  fragment ListComponent on List {
    title
    maxNumCards
    cards {
      ...CardComponent
    }
  }
`;
