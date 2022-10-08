/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { draggedCard } from "./cache";
import { CardComponentFragment } from "./generated/graphql";
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
        console.log("onClick");

        draggedCard(i++);
        console.log("set draggedCard = ", draggedCard());
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
