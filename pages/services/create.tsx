import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import {
  AuthenticatedPageProps,
  getLoggedUser,
  withDentistRoute,
} from "@modules/auth";
import { Field, NumberField } from "@modules/forms";
import { useCreateService } from "@modules/services";

export const getServerSideProps = withDentistRoute(getLoggedUser);
type CreateProps = AuthenticatedPageProps;

const Create = ({ user }: CreateProps) => {
  const { name, price, onSubmit } = useCreateService(user.token);

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

      <FormPage title="Criar serviço" onSubmit={onSubmit}>
        <Field {...name} inputId="create-service-name">
          Nome
        </Field>
        <NumberField {...price} inputId="create-service-price">
          Preço
        </NumberField>
        <button className="button">Cadastrar serviço</button>
      </FormPage>
    </>
  );
};

Create.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Create;
