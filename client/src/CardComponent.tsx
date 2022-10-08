/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { draggedCard } from "./cache";
import { CardComponentFragment } from "./generated/graphql";
export interface CardComponentProps {
  fragment: CardComponentFragment;
}

export const CardComponent = ({ fragment }: CardComponentProps) => {
  return (
    <div
      draggable={true}
      css={css`
        padding: 10px;
        background-color: #ffffff;
      `}
      onDragStart={() => {
        draggedCard(fragment.id);
        console.log("set draggedCard = ", draggedCard());
      }}
    >
      <div>{fragment.title}</div>
    </div>
  );
};

CardComponent.fragment = gql`
  fragment CardComponent on Card {
    id
    title
    description
    labels
  }
`;
