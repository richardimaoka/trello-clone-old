/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { CardComponentFragment } from "./generated/graphql";

export interface CardComponentProps {
  fragment: CardComponentFragment;
}

export const CardComponent = ({ fragment }: CardComponentProps) => {
  return (
    <div draggable={true} css={css``}>
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
