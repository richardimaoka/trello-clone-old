/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { CardComponentFragment } from "./generated/graphql";
import { draggedCard } from "./Cache";
export interface CardComponentProps {
  fragment: CardComponentFragment;
}

let i = 0;
export const CardComponent = ({ fragment }: CardComponentProps) => {
  return (
    <div
      draggable={true}
      css={css`
        padding: 10px;
        background-color: #ffffff;
      `}
      onClick={() => {
        draggedCard(i++);
      }}
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
