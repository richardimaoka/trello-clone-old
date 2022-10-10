/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { DragEventHandler } from "react";
import { draggedCardId, overlaidCardId } from "./cache";
import { CardComponentFragment } from "./generated/graphql";
export interface CardComponentProps {
  fragment: CardComponentFragment;
}

export const CardComponent = ({ fragment }: CardComponentProps) => {
  const backgroundColor =
    fragment.id === draggedCardId()
      ? "#6d6060"
      : fragment.id === overlaidCardId()
      ? "#80dbff"
      : "#ffffff";

  const setDraggedCardId = () => {
    draggedCardId(fragment.id);
  };
  const unSetDraggedCardId = () => {
    draggedCardId("");
  };
  const setOverlaidCardId: DragEventHandler<HTMLDivElement> = (e) => {
    if (fragment.id !== draggedCardId()) {
      overlaidCardId(fragment.id);
    }
  };

  return (
    <div
      draggable={true}
      css={css`
        padding: 10px;
        background-color: ${backgroundColor};
      `}
      onDragStart={setDraggedCardId}
      onDragEnd={unSetDraggedCardId}
      onDragEnter={setOverlaidCardId}
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
