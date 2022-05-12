import Head from "next/head";
import { ReactElement, useMemo, Fragment } from "react";
import { Dashboard, Dropdown } from "@components";
import { useSortBy, useTable } from "react-table";
import { Menu, Transition } from "@headlessui/react";
import {
  CgChevronDown,
  CgDetailsMore,
  CgPen,
  CgTrash,
  CgTrashEmpty,
} from "react-icons/cg";

const Users = () => {
  const data = useMemo(
    () => [
      {
        id: "user-01",
        email: "foo.bar@example.com",
        name: "Foo Bar",
        role: "Administrador",
      },
      {
        id: "user-02",
        email: "bar.foo@example.com",
        name: "Bar Foo",
        role: "Dentista",
      },
      {
        id: "user-03",
        email: "john.doe@example.com",
        name: "John Doe",
        role: "Dentista",
      },
      {
        id: "user-04",
        email: "jane.doe@example.com",
        name: "Jane Doe",
        role: "Dentista",
      },
      {
        id: "user-05",
        email: "bar.bazz@example.com",
        name: "Bar Bazz",
        role: "Dentista",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Nome",
      },
      {
        accessor: "email",
        Header: "E-mail",
      },
      {
        accessor: "role",
        Header: "Função",
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
        <title>Listar</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flow">
        <h1>Usuários</h1>
        <figure className="card table--wrapper">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                // eslint-disable-next-line react/jsx-key
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => {
                    const sortIcon = column.isSortedDec ? " 🔽" : " 🔼";
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span role="columnheader">
                          {column.isSorted ? sortIcon : ""}
                        </span>
                      </th>
                    );
                  })}
                  <th>Ações</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, rowIdx) => {
                prepareRow(row);
                const isNearBottom = rowIdx + 2 < rows.length;
                const positionDirection = isNearBottom ? "top" : "bottom";

                return (
                  <tr {...row.getRowProps()} key={rowIdx}>
                    {row.cells.map((cell) => (
                      // eslint-disable-next-line react/jsx-key
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                    <td key={"user-actions-" + rowIdx}>
                      <Dropdown
                        position={{
                          [positionDirection]: "calc(100% + 0.5em)",
                          right: 0,
                        }}
                        options={[
                          {
                            id: "details",
                            icon: CgDetailsMore,
                            text: "Mostrar detalhes",
                          },
                          {
                            id: "update",
                            icon: CgPen,
                            text: "Atualizar Usuário",
                          },
                          {
                            id: "delete",
                            icon: CgTrash,
                            text: "Excluir Usuário",
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </figure>
      </div>
    </>
  );
};

Users.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Users;
