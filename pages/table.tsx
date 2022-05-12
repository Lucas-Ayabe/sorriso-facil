import Head from "next/head";
import { ReactElement, useMemo } from "react";
import { Dashboard } from "@components";
import { useSortBy, useTable } from "react-table";

const Table = () => {
  const data = useMemo(
    () => [
      {
        id: "user-01",
        email: "foo.bar@example.com",
        role: "admin",
      },
      {
        id: "user-02",
        email: "bar.foo@example.com",
        role: "dentist",
      },
      {
        id: "user-03",
        email: "john.doe@example.com",
        role: "dentist",
      },
      {
        id: "user-04",
        email: "jane.doe@example.com",
        role: "dentist",
      },
      {
        id: "user-05",
        email: "bar.bazz@example.com",
        role: "dentist",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "E-mail",
        accessor: "email",
      },
      {
        Header: "Tipo",
        accessor: "role",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns as any,
        data,
      },
      useSortBy
    );

  return (
    <>
      <Head>
        <title>Table</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flow">
        <h1>Table</h1>
        <figure className="card">
          <table {...getTableProps()}>
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup, headerIdx) => (
                  // Apply the header row props
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerIdx}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column: any, columnIdx) => (
                        // Apply the header cell props
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={columnIdx}
                        >
                          {
                            // Render the header
                            column.render("Header")
                          }
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row, rowIdx) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()} key={rowIdx}>
                      {
                        // Loop over the rows cells
                        row.cells.map((cell, cellIdx) => {
                          // Apply the cell props
                          return (
                            <td {...cell.getCellProps()} key={cellIdx}>
                              {
                                // Render the cell contents
                                cell.render("Cell")
                              }
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </figure>
      </div>
    </>
  );
};

Table.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Table;
