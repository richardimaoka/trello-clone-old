import { gql } from "@apollo/client";
import { Card, ListComponentFragment } from "./generated/graphql";
import { CardComponent } from "./CardComponent";
import { excludeNullFromArray } from "./excludeNullFromArray";

export interface ListComponentProps {
  fragment: ListComponentFragment;
}

export const ListComponent = ({ fragment }: ListComponentProps) => {
  const cards = fragment.cards
    ? excludeNullFromArray<Card>(fragment.cards)
    : [];

  return (
    <div>
      <div>{fragment.title}</div>
      {cards.map((c, index) => (
        <CardComponent key={index} fragment={c} />
      ))}
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
