/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { DragEventHandler } from "react";
import {
  draggedCardId as makeDraggedCardId,
  overlaidCardId as makeOverlaidCardId,
} from "./cache";
import { CardComponentFragment } from "./generated/graphql";
export interface CardComponentProps {
  fragment: CardComponentFragment;
  overlaidCardId: string | null;
  draggedCardId: string | null;
}

export const CardComponent = ({
  fragment,
  overlaidCardId,
  draggedCardId,
}: CardComponentProps) => {
  const backgroundColor =
    fragment.id === draggedCardId
      ? "#6d6060"
      : fragment.id === overlaidCardId
      ? "#80dbff"
      : "#ffffff";

  const setDraggedCardId = () => {
    makeDraggedCardId(fragment.id);
  };
  const clearDragAndOverlay = () => {
    makeDraggedCardId("");
    makeOverlaidCardId("");
  };
  const setOverlaidCardId: DragEventHandler<HTMLDivElement> = (e) => {
    if (fragment.id !== draggedCardId) {
      makeOverlaidCardId(fragment.id);
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
      onDragEnd={clearDragAndOverlay}
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
