/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { editScreenCardId } from "./cache";

export const CardEditor = () => {
  const unsetCadEditor = () => {
    editScreenCardId("");
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
