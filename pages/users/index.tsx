import Head from "next/head";
import { ReactElement, useMemo, Fragment } from "react";
import { Dashboard } from "@components";
import { useSortBy, useTable } from "react-table";
import { Menu, Transition } from "@headlessui/react";
import { CgChevronDown, CgTrash, CgTrashEmpty } from "react-icons/cg";

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
                const cellId = data.find((_, pos) => pos === rowIdx);
                return (
                  <tr {...row.getRowProps()} key={rowIdx}>
                    {row.cells.map((cell) => (
                      // eslint-disable-next-line react/jsx-key
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                    <td key={"user-actions-" + rowIdx}>
                      <Menu as="div" className="dropdown">
                        <div>
                          <Menu.Button className="button--small">
                            Options
                            <CgChevronDown
                              className="arrow"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="enter"
                          enterFrom="enter-from"
                          enterTo="enter-to"
                          leave="enter-leave"
                          leaveFrom="leave-from"
                          leaveTo="leave-to"
                        >
                          <Menu.Items className="content">
                            <div className="divider">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "active" : ""} item`}
                                  >
                                    <span className="icon">
                                      {active ? (
                                        <CgTrash
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <CgTrashEmpty
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                    <span className="text">
                                      Mostrar detalhes
                                    </span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>

                            <div className="divider">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "active" : ""} item`}
                                  >
                                    <span className="icon">
                                      {active ? (
                                        <CgTrash
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <CgTrashEmpty
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                    <span className="text">
                                      Editar {cellId?.id}
                                    </span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>

                            <div className="divider">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "active" : ""} item`}
                                  >
                                    <span className="icon">
                                      {active ? (
                                        <CgTrash
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <CgTrashEmpty
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                    <span className="text">
                                      Excluir {cellId?.id}
                                    </span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
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
