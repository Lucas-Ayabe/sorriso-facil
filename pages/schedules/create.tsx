import { ReactElement } from "react";

import {
  withDentistRoute,
  Props,
  getServerSidePropsReturn,
} from "@modules/auth";
import { Dashboard, FormPage } from "@modules/ui";
import { Field, SelectField } from "@modules/forms";
import { findLogged, Dentist } from "@modules/dentist";
import { useCreateSchedule } from "@modules/schedules";
import { MaybeAsync } from "purify-ts";

type CreateProps = Props<Dentist>;
export const getServerSideProps = withDentistRoute(async ({ req }) => {
  const user = {
    token: req.session.user?.token ?? "",
    admin: req.session.user?.admin ?? false,
  };

  return getServerSidePropsReturn<Dentist>({
    user,
    maybe: MaybeAsync(async () => ({
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      schedules: [],
      clients: [
        { id: 1, name: "foo", age: 23, schedules: [] },
        { id: 2, name: "bar", age: 17, schedules: [] },
        { id: 3, name: "bazz", age: 28, schedules: [] },
      ],
      services: [
        { id: 1, name: "Limpeza", price: 250 },
        { id: 2, name: "Manutenção", price: 200.5 },
      ],
    })),
    onFailDestination: "/schedules",
  });
});

const Create = ({ user, entity: dentist }: CreateProps) => {
  const { client, service, startTime, endTime, onSubmit } = useCreateSchedule(
    user.token,
    {
      client: {
        options: dentist.clients.map(({ name, id }) => ({
          label: name,
          value: id.toString(),
        })),
      },
      service: {
        options: dentist.services.map(({ name, id }) => ({
          label: name,
          value: id.toString(),
        })),
      },
    }
  );

  return (
    <FormPage title="Agendar" onSubmit={onSubmit}>
      <SelectField {...client} inputId="create-schedule-client">
        Cliente
      </SelectField>
      <SelectField {...service} inputId="create-schedule-service">
        Serviço
      </SelectField>
      <Field {...startTime} type="datetime-local">
        Data de início
      </Field>
      <Field {...endTime} type="datetime-local">
        Data de fim
      </Field>

      <button className="button">Agendar</button>
    </FormPage>
  );
};

Create.getLayout = (page: ReactElement, { user }: CreateProps) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Create;
