import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard, FormPage } from "@modules/ui";

import {
  AuthenticatedPageProps,
  getLoggedUser,
  withDentistRoute,
} from "@modules/auth";
import { Field, NaturalNumberField, SelectField } from "@modules/forms";
import { useCreateClient } from "@modules/clients";

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
        <SelectField
          inputId="create-client-state"
          options={[
            { label: "Escolha um estado", value: "", disabled: true },
            { label: "São Paulo", value: "SP" },
            { label: "Rio de Janeiro", value: "RJ" },
          ]}
          {...state}
        >
          Estado
        </SelectField>
        <Field {...cep} inputId="create-client-cep">
          CEP
        </Field>
      </fieldset>

      <fieldset className="flow">
        <legend>Números de Telefone</legend>

        {/**
         * Criar componente <MultiField />. Ex:
         *   <MultiField
         *     values={string[]}
         *     onAddField={(value: string) => void}
         *     label={(value: string, index: number) => string}
         *     keyExtractor={(value: string, index: number) => string}
         *     onChange={(value: string, index: number) => void}
         *   />
         *
         * =================================================
         *
         * Design base:
         *    {values.map((value, index) => {
         *       const isLast = index === values.length - 1;
         *       return (
         *         <div key={keyExtractor(value, index)}>
         *           <label>{label(value, index)}</label>
         *           <div>
         *              <input value={value} onChange={onChange} />
         *              {isLast && (
         *                <button onClick={() => onAddField(value, index)}>
         *                +
         *                </button>
         *              )}
         *           </div>
         *         </div>
         *       )
         *    }}
         */}
        <Field inputId="create-service-telphone-1" />
      </fieldset>

      <button className="button">Cadastrar cliente</button>
    </FormPage>
  );
};

Create.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Create;
