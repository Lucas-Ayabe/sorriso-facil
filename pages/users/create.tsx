import Head from "next/head";
import { ReactElement } from "react";
import {
  CgChevronDown,
  CgDetailsMore,
  CgMoreVerticalAlt,
  CgPen,
  CgTrash,
  CgTrashEmpty,
} from "react-icons/cg";
import { Dashboard, Dropdown } from "@components";

const Create = () => {
  return (
    <>
      <Head>
        <title>Criar</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flow">
        <h1>Criar Usuário</h1>

        <Dropdown
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
      </div>
    </>
  );
};

Create.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Create;
