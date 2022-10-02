/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { CardComponentFragment } from "./generated/graphql";

export interface CardComponentProps {
  fragment: CardComponentFragment;
}

export const CardComponent = ({ fragment }: CardComponentProps) => {
  const something = () => {
    console.log("somethings is called");
  };

  return (
    <div
      draggable={true}
      css={css`
        padding: 10px;
        background-color: #ffffff;
      `}
      onDragStart={something}
    >
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
