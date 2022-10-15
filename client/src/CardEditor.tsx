/** @jsxImportSource @emotion/react */

import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { controlVariable, editScreenCardId } from "./cache";
import { useGetCardEditorQuery } from "./generated/graphql";

gql`
  query getCardEditor($id: ID!) {
    card(id: $id) {
      ...CardEditor
    }
  }
`;

interface CardEdtiorProps {
  cardId: string;
}

export const CardEditor = ({ cardId }: CardEdtiorProps) => {
  const { loading, error, data } = useGetCardEditorQuery({
    variables: { id: cardId },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error happened... {error.message}</div>;
  if (!data) return <div>missing data...</div>;

  const unsetCadEditor = () => {
    editScreenCardId("");
    controlVariable(null);
  };

  return (
    <div
      css={css`
        /* whole window positioning */
        position: fixed;
        width: 100%;
        height: 100%;
        /* inner content handling */
        display: flex;
        justify-content: center;
        align-items: flex-start; /*to grow inner content in height > 100% of outer element*/
        overflow-y: scroll;
        /* background */
        background-color: white;
        opacity: 0.8;
      `}
      onClick={unsetCadEditor}
    >
      <div
        css={css`
          margin: 20px 0px;
          width: 768px;
          background-color: #acacac;
        `}
      >
        <div
          css={css`
            height: 60px;
          `}
        >
          {data.card?.description}
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
        <div
          css={css`
            height: 60px;
          `}
        >
          abc
        </div>
      </div>
    </div>
  );
};

CardEditor.fragment = gql`
  fragment CardEditor on Card {
    id
    description
  }
`;
