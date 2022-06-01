import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import { withDentistRoute } from "@modules/auth";
import { Field, NaturalNumberField } from "@modules/forms";
import { findById, Service, useUpdateService } from "@modules/services";

type ErrorReturn = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
};

type Props = {
  user: { token: string; admin: boolean };
  service: Service & { id: number };
};

type SuccessReturn = { props: Props };

type Return = SuccessReturn | ErrorReturn;

export const getServerSideProps = withDentistRoute(async ({ req, params }) => {
  const user = req.session.user;
  const id = +(params?.id ?? 0);

  return (await findById(user?.token ?? "", id)).caseOf<Return>({
    Just: (service) => ({
      props: {
        user: user as any,
        service,
      },
    }),
    Nothing: () => ({
      redirect: {
        destination: "/services",
        permanent: false,
      },
    }),
  });
});

type UpdateProps = Props;

const Update = ({ user, service }: UpdateProps) => {
  const { id, ...initialData } = service;
  const { name, price, onSubmit } = useUpdateService(
    user.token,
    id,
    initialData
  );

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

      <FormPage title="Criar serviço" onSubmit={onSubmit}>
        <Field {...name} inputId="update-service-name">
          Nome
        </Field>
        <NaturalNumberField {...price} inputId="update-service-price">
          Preço
        </NaturalNumberField>
        <button className="button">Atualizar serviço</button>
      </FormPage>
    </>
  );
};

Update.getLayout = (page: ReactElement, { user }: UpdateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Update;
