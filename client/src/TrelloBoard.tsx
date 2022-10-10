/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import { css } from "@emotion/react";
import { excludeNullFromArray } from "./excludeNullFromArray";
import {
  ListComponentFragment,
  useGetSearchResultQuery,
} from "./generated/graphql";
import { ListComponent } from "./ListComponent";

//This is read by GraphQL codegen to generate types
const QUERY = gql`
  query GetSearchResult {
    draggedCard @client
    lists {
      ...ListComponent
    }
  }
`;

export const TrelloBoard = () => {
  const { loading, error, data } = useGetSearchResultQuery();

  if (loading) {
    console.log("loading TrelloBoard");
    return <div>loading...</div>;
  } else if (error) {
    console.log("error TrelloBoard", error.message);
    return <div>error happened {error.message}</div>;
  } else if (!data) {
    console.log("error 2 TrelloBoard empty data");
    return <div>error happened</div>;
  } else {
    const lists = data.lists
      ? excludeNullFromArray<ListComponentFragment>(data.lists)
      : [];
    return (
      <>
        <div>{data.draggedCard}</div>
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
      </>
    );
  }
};
