import * as React from "react";
import { StyledResultHeaderText, StyledResult } from "./StyledResult";
import { Table } from "./Table";
import { OutputList } from "../types";
import { CSVLink } from "react-csv";

type Props = {
  results?: OutputList[];
};

const Result: React.FC<Props> = ({ results }: any) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "SKU",
        accessor: "SKU",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
      {
        Header: "Source",
        accessor: "Source",
      },
    ],

    []
  );

  const headers = [
    { label: "SKU", key: "SKU" },
    { label: "Description", key: "Description" },
    { label: "Source", key: "Source" },
  ];

  return (
    <>
      <StyledResultHeaderText>Final Result</StyledResultHeaderText>
      <StyledResult>
        <Table columns={columns} data={results} />
      </StyledResult>
      <CSVLink data={results} filename={"result_output.csv"} headers={headers}>
        Download Your CSV Here
      </CSVLink>
    </>
  );
};

export default Result;
