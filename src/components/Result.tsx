import * as React from "react";
import {
  StyledResultHeaderText,
  StyledResult,
  StyledResultFestival,
  StyledResultLabelText,
  StyledResultBandText,
  StyledResultFestivalText,
} from "./StyledResult";
import { OutputList } from "../types";
import { useTable } from "react-table";

type Props = {
  results?: OutputList[];
};

function Table({ columns, data }: any) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                  console.log("aaaa", cell)
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Result: React.FC<Props> = ({ results }) => {
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

  return (
    <>
      <StyledResultHeaderText>Final Result</StyledResultHeaderText>
      <StyledResult>
        <Table columns={columns} data={results} />
      </StyledResult>
    </>
  );
};

export default Result;
