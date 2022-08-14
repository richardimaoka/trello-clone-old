import { gql } from "@apollo/client";
import { EmployeeComponentFragment } from "./generated/graphql";

export interface EmployeeComponentProps {
  fragment: EmployeeComponentFragment;
}

export const EmployeeComponent = ({ fragment }: EmployeeComponentProps) => {
  return (
    <div style={{ display: "flex", columnGap: "20px", marginBottom: "10px" }}>
      <div>{fragment.name}</div>
      <div>{fragment.jobTitle}</div>
      <div>{fragment.department}</div>
    </div>
  );
};

EmployeeComponent.fragment = gql`
  fragment EmployeeComponent on Employee {
    name
    jobTitle
    department
  }
`;
