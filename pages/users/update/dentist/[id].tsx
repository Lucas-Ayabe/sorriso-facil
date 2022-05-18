import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import {
  protectedAsAdminRoute,
  AuthenticatedAsAdminPageProps,
  defaultHandler,
} from "@modules/auth";
import { Field } from "@modules/forms";

export const getServerSideProps = protectedAsAdminRoute(defaultHandler);

type UpdateProps = AuthenticatedAsAdminPageProps;

const Update = () => {
  return (
    <>
      <Head>
        <title>Atualizar</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FormPage title="Atualizar usuário">
        <Field>Nome</Field>
        <Field>E-mail</Field>
        <Field>Senha</Field>

        <button className="button">Atualizar usuário</button>
      </FormPage>
    </>
  );
};

Update.getLayout = (page: ReactElement, { user }: UpdateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Update;
