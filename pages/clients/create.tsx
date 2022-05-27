import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import {
  AuthenticatedPageProps,
  getLoggedUser,
  withDentistRoute,
} from "@modules/auth";
import {
  Field,
  MultiField,
  NaturalNumberField,
  SelectField,
} from "@modules/forms";
import { useCreateClient } from "@modules/clients";
import { MaskedField } from "@modules/forms/components/MaskedField";

export const getServerSideProps = withDentistRoute(getLoggedUser);
type CreateProps = AuthenticatedPageProps;

const Create = ({ user }: CreateProps) => {
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
  } = useCreateClient(user.token);

  return (
    <FormPage title="Criar Cliente" onSubmit={onSubmit}>
      <Field {...name} inputId="create-client-name">
        Nome
      </Field>
      <NaturalNumberField {...age} inputId="create-client-age">
        Idade
      </NaturalNumberField>

      <fieldset className="flow">
        <legend>
          <span>Endereço</span>
        </legend>

        <Field {...street} inputId="create-client-street">
          Rua
        </Field>
        <Field {...neighborhood} inputId="create-client-neighborhood">
          Bairro
        </Field>
        <NaturalNumberField {...number} inputId="create-client-number">
          Número
        </NaturalNumberField>
        <Field {...city} inputId="create-client-city">
          Cidade
        </Field>
        <SelectField {...state} inputId="create-client-state">
          Estado
        </SelectField>
        <MaskedField {...cep} inputId="create-client-cep">
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
          keyExtractor={(_, index) => `create-client-telephone-${index + 1}`}
          {...telephones}
        />
      </fieldset>

      <button className="button">Cadastrar cliente</button>
    </FormPage>
  );
};

Create.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Create;
