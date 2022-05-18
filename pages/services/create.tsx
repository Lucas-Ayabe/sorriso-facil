import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import {
  AuthenticatedPageProps,
  defaultHandler,
  dentistRoute,
} from "@modules/auth";
import { Field } from "@modules/forms";

export const getServerSideProps = dentistRoute(defaultHandler);
type CreateProps = AuthenticatedPageProps;

const Create = ({ user }: CreateProps) => {
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

      <FormPage title="Criar serviço">
        <Field inputId="create-service-name">Nome</Field>
        <Field inputId="create-service-price">Preço</Field>

        <button className="button">Criar serviço</button>
      </FormPage>
    </>
  );
};

Create.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Create;
