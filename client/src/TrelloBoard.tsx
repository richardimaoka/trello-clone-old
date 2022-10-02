/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { gql } from "@apollo/client";
import { excludeNullFromArray } from "./excludeNullFromArray";
import { List, useGetSearchResultQuery } from "./generated/graphql";
import { ListComponent } from "./ListComponent";

//This is read by GraphQL codegen to generate types
gql`
  query GetSearchResult {
    lists {
      ...ListComponent
    }
  }
`;

export const TrelloBoard = () => {
  const { loading, error, data } = useGetSearchResultQuery();
  if (loading) {
    return <div>loading...</div>;
  } else if (error) {
    return <div>error happened {error.message}</div>;
  } else if (!data) {
    return <div>error happened</div>;
  } else {
    const lists = data.lists ? excludeNullFromArray<List>(data.lists) : [];
    return (
      <div
        css={css`
          display: flex;
          column-gap: 10px;
        `}
      >
        {lists.map((l, index) => (
          <ListComponent key={index} fragment={l} />
        ))}
      </div>
    );
  }
};
