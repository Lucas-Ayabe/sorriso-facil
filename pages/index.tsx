import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { Dashboard, Field } from "@components";

const Home = () => {
  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then(console.log);
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flow">
        <h1>Adicionar Serviço</h1>

        <form className="card flow" style={{ ["--card-space"]: "2em" } as any}>
          <Field>Nome do serviço</Field>
          <Field>Serviço</Field>

          <button className="button--small">Enviar</button>
        </form>
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Home;
