import { gql } from "@apollo/client";
import { CardComponentFragment } from "./generated/graphql";

export interface CardComponentProps {
  fragment: CardComponentFragment;
}

export const CardComponent = ({ fragment }: CardComponentProps) => {
  return (
    <div style={{ display: "flex", columnGap: "20px", marginBottom: "10px" }}>
      <div>{fragment.title}</div>
    </div>
  );
};

CardComponent.fragment = gql`
  fragment CardComponent on Card {
    title
    description
    labels
  }
`;
