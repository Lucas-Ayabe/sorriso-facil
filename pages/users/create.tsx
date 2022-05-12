import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard } from "@components";

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
      </div>
    </>
  );
};

Create.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Create;
