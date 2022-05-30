import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Link
} from "@material-ui/core";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { Link as RouterLink } from "react-router-dom";
import DateRangeField, { printDateValue } from "./DateRangeField";
import SearchField from "./SearchField";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650
  },
  thead: {
    backgroundColor: "#6D7884"
  },
  th: {
    color: "#FFFFFF",
    fontWeight: 700
  }
}));

export const TableComponent = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Session ID",
        accessor: "id"
      },
      {
        Header: "IO ID",
        accessor: "ioId"
      },
      {
        Header: "User",
        accessor: "email"
      },
      {
        Header: "Date",
        accessor: "lastUpdate",
        filter: "between"
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useGlobalFilter
  );

  const classes = useStyles();

  return (
    <>
      <Paper elevation={0}>
        <div className="SearchGrid">
          <SearchField
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <DateRangeField headerGroups={headerGroups} />
        </div>
      </Paper>
      <Paper elevation={1}>
        {rows.length > 0 ? (
          <Table
            className={classes.table}
            aria-label="records_table"
            {...getTableProps()}
          >
            <TableHead className={classes.thead}>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <TableCell
                        className={classes.th}
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </TableCell>
                    );
                  })}
                  <TableCell />
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow hover={true} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      const { column, value } = cell;
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {column.id === "lastUpdate"
                            ? printDateValue(value)
                            : cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/record/${row.values.id}`}
                        color="secondary"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>No records found.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Paper>
    </>
  );
};

export default TableComponent;
