import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import {
  adminRoute,
  AuthenticatedAsAdminPageProps,
  defaultHandler,
} from "@modules/auth";
import { Field } from "@modules/forms";
import { useCreateUser } from "@modules/users";

export const getServerSideProps = adminRoute(defaultHandler);
type CreateProps = AuthenticatedAsAdminPageProps;

const Create = ({ user }: CreateProps) => {
  const { name, email, password, admin, onSubmit } = useCreateUser({
    token: user.token,
  });

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

      <FormPage title="Criar usuário" onSubmit={onSubmit}>
        <Field inputId="create-user-name" {...name}>
          Nome
        </Field>
        <Field inputId="create-user-email" {...email}>
          E-mail
        </Field>
        <Field inputId="create-user-password" {...password}>
          Senha
        </Field>

        <div>
          <label htmlFor="admin">
            <span style={{ marginRight: "1em" }}>É administrador</span>
            <input {...admin} type="checkbox" name="admin" id="admin" />
          </label>
        </div>

        <button className="button">Criar usuário</button>
      </FormPage>
    </>
  );
};

Create.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Create;
