import { gql } from "@apollo/client";
import { EmployeeComponent } from "./EmployeeComponent";
import { excludeNullFromArray } from "./excludeNullFromArray";
import { Employee, useGetSearchResultQuery } from "./generated/graphql";

//This is read by GraphQL codegen to generate types
gql`
  query GetSearchResult {
    search {
      ...EmployeeComponent
    }
  }
`;

const SearchResultNonEmpty = ({ employees }: { employees: Employee[] }) => (
  <div>
    {employees.map((employee) => (
      <EmployeeComponent fragment={employee} />
    ))}
  </div>
);

export const SearchResult = () => {
  const { loading, error, data } = useGetSearchResultQuery();
  if (loading) {
    return <div>loading...</div>;
  } else if (error) {
    return <div>error happened</div>;
  } else if (!data || !data.search) {
    return <div>error happened</div>;
  } else {
    const employees = excludeNullFromArray<Employee>(data.search);
    return <SearchResultNonEmpty employees={employees} />;
  }
};
