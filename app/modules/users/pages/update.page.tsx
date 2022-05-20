import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import { withAdminRoute, AuthenticatedPageProps } from "@modules/auth";
import { Field } from "@modules/forms";
import * as UserService from "@modules/users/services/user.service";
import { User, UserRole, useUpdateUser } from "@modules/users";

type ErrorReturn = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
};

type Props = {
  role: UserRole;
  user: { token: string; admin: boolean };
  formUser: User & { id: number };
};

type SuccessReturn = { props: Props };

type Return = SuccessReturn | ErrorReturn;

export const getServerSidePropsFactory = (role: UserRole) => {
  return withAdminRoute(async ({ req, params }) => {
    const id = +(params?.id as string) ?? 0;
    const token = req.session.user?.token ?? "";

    return UserService.findByRole(role, id, token).caseOf<Return>({
      Just: (user) => {
        return {
          props: {
            role,
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
};

type UpdateProps = AuthenticatedPageProps<Props>;

export const UpdatePage = ({ formUser, user, role }: UpdateProps) => {
  const { name, email, password, onSubmit } = useUpdateUser({
    role,
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

UpdatePage.getLayout = (page: ReactElement, { user }: UpdateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);
