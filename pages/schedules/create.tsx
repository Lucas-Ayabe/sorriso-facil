import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import {
  AuthenticatedPageProps,
  getLoggedUser,
  withDentistRoute,
} from "@modules/auth";
import { Field, NumberField } from "@modules/forms";

export const getServerSideProps = withDentistRoute(getLoggedUser);
type CreateProps = AuthenticatedPageProps;

const Create = ({ user }: CreateProps) => {
  return (
    <FormPage title="Agendar">
      <Field inputId="create-schedule-name">Nome</Field>
      <NumberField inputId="create-schedule-price">Preço</NumberField>
      <button className="button">Agendar</button>
    </FormPage>
  );
};

Create.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Create;
