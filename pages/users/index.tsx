import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard } from "@modules/ui/components";
import { columnFormatters as format, DataTable } from "@modules/data";
import { useDataTable } from "@modules/data/hooks/use-data-table";
import { CgList } from "react-icons/cg";

const data = [
  {
    id: 1,
    name: "Lucas",
    age: 18,
    birthdate: new Date("2002-04-12"),
  },
  {
    id: 2,
    name: "Lucas",
    age: 18,
    birthdate: new Date("2002-04-12"),
  },
  {
    id: 3,
    name: "Lucas",
    age: 18,
    birthdate: new Date("2002-04-12"),
  },
];

const Users = () => {
  const table = useDataTable(
    [
      {
        acessor: "id",
        label: "ID",
        format: format.string,
      },
      {
        acessor: "name",
        label: "Nome",
        format: format.string,
      },
      {
        acessor: "age",
        label: "Idade",
        format: format.number,
      },
      {
        acessor: "birthdate",
        label: "Data de nascimento",
        format: format.date("pt-BR"),
      },
    ],
    data,
    [
      {
        id: "list",
        icon: CgList,
        text: "List",
        onClick(item) {
          alert(item.name);
        },
      },
      {
        id: "list-01",
        icon: CgList,
        text: "List",
        onClick(item) {
          alert(item.name);
        },
      },
      {
        id: "list-02",
        icon: CgList,
        text: "List",
        onClick(item) {
          alert(item.name);
        },
      },
      {
        id: "list-03",
        icon: CgList,
        text: "List",
        onClick(item) {
          alert(item.name);
        },
      },
    ]
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

        <DataTable {...table} />
      </div>
    </>
  );
};

Users.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Users;
