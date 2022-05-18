import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import { adminRoute, AuthenticatedPageProps } from "@modules/auth";
import { Field } from "@modules/forms";
import * as UserService from "@modules/users/services/user.service";
import { User, useUpdateUser } from "@modules/users";

type ErrorReturn = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
};

type SuccessReturn = {
  props: {
    user: { token: string; admin: boolean };
    formUser: User & { id: number };
  };
};

export const getServerSideProps = adminRoute(async ({ req, params }) => {
  const id = +(params?.id as string) ?? 0;
  return UserService.findByRole(
    "dentist",
    id,
    req.session.user?.token ?? ""
  ).caseOf<SuccessReturn | ErrorReturn>({
    Just: (user) => {
      return {
        props: {
          user: req.session.user,
          formUser: { ...user, id },
        },
      } as SuccessReturn;
    },
    Nothing: () => {
      return {
        redirect: {
          destination: "/users",
          permanent: false,
        },
      };
    },
  });
});

type UpdateProps = AuthenticatedPageProps<{ formUser: User }>;

const Update = ({ formUser, user }: UpdateProps) => {
  const { name, email, password, onSubmit } = useUpdateUser({
    role: "dentist",
    token: user.token,
    ...formUser,
  });

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

      <FormPage title="Atualizar usuário" onSubmit={onSubmit}>
        <Field {...name}>Nome</Field>
        <Field {...email}>E-mail</Field>
        <Field {...password}>Senha</Field>

        <button className="button">Atualizar usuário</button>
      </FormPage>
    </>
  );
};

Update.getLayout = (page: ReactElement, { user }: UpdateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Update;
