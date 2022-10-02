import { gql } from "@apollo/client";
// import { EmployeeComponent } from "./EmployeeComponent";
// import { excludeNullFromArray } from "./excludeNullFromArray";
import { useGetSearchResultQuery } from "./generated/graphql";

//This is read by GraphQL codegen to generate types
gql`
  query GetSearchResult {
    lists {
      cards {
        description
        title
      }
    }
  }
`;

// const SearchResultNonEmpty = ({ employees }: { employees: Employee[] }) => (
//   <div>
//     {employees.map((employee) => (
//       <EmployeeComponent fragment={employee} />
//     ))}
//   </div>
// );

export const TrelloBoard = () => {
  const { loading, error, data } = useGetSearchResultQuery();
  if (loading) {
    return <div>loading...</div>;
  } else if (error) {
    return <div>error happened {error.message}</div>;
  } else if (!data) {
    return <div>error happened</div>;
  } else {
    return <div>non error</div>;
  }
};
