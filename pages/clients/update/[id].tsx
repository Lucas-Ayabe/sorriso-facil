import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import { AuthenticatedPageProps, withDentistRoute } from "@modules/auth";

import {
  Field,
  MultiField,
  NaturalNumberField,
  SelectField,
} from "@modules/forms";

import { CompleteClient, findById, useUpdateClient } from "@modules/clients";
import { MaskedField } from "@modules/forms/components/MaskedField";

type ErrorReturn = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
};

type Props = {
  user: { token: string; admin: boolean };
  client: CompleteClient & { id: number };
};

type SuccessReturn = { props: Props };

type Return = SuccessReturn | ErrorReturn;

export const getServerSideProps = withDentistRoute(async ({ req, params }) => {
  const user = req.session.user;
  const id = +(params?.id ?? 0);

  return (await findById(user?.token ?? "", id)).caseOf<Return>({
    Just: (client) => ({
      props: {
        user: user as any,
        client,
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
type CreateProps = AuthenticatedPageProps & Props;

const Update = ({ user, client }: CreateProps) => {
  const {
    name,
    age,
    street,
    neighborhood,
    number,
    city,
    state,
    cep,
    telephones,
    onSubmit,
  } = useUpdateClient(user.token, client.id, client);

  return (
    <FormPage title="Atualizar Cliente" onSubmit={onSubmit}>
      <Field {...name} inputId="update-client-name">
        Nome
      </Field>
      <NaturalNumberField {...age} inputId="update-client-age">
        Idade
      </NaturalNumberField>

      <fieldset className="flow">
        <legend>
          <span>Endereço</span>
        </legend>

        <Field {...street} inputId="update-client-street">
          Rua
        </Field>
        <Field {...neighborhood} inputId="update-client-neighborhood">
          Bairro
        </Field>
        <NaturalNumberField {...number} inputId="update-client-number">
          Número
        </NaturalNumberField>
        <Field {...city} inputId="update-client-city">
          Cidade
        </Field>
        <SelectField {...state} inputId="update-client-state">
          Estado
        </SelectField>
        <MaskedField {...cep} inputId="update-client-cep">
          CEP
        </MaskedField>
      </fieldset>

      <fieldset className="flow">
        <legend
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Números de Telefone{" "}
          <button
            type="button"
            onClick={() => telephones.addField()}
            className="button--small"
          >
            +
          </button>
        </legend>

        <MultiField
          label={(_, index) => `Telefone n°${index + 1}`}
          keyExtractor={(_, index) => `update-client-telephone-${index + 1}`}
          {...telephones}
        />
      </fieldset>

      <button className="button">Ataulizar cliente</button>
    </FormPage>
  );
};

Update.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Update;
