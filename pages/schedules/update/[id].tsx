import { ReactElement } from "react";

import {
  withDentistRoute,
  Props,
  getServerSidePropsReturn,
} from "@modules/auth";
import { Dashboard, FormPage } from "@modules/ui";
import { Field, SelectField } from "@modules/forms";
import { findLogged, Dentist } from "@modules/dentist";
import { Schedule, useUpdateSchedule } from "@modules/schedules";
import { MaybeAsync } from "purify-ts";
import _ from "lodash";

type UpdateProps = {
  id: number;
  schedule: Schedule;
  dentist: Dentist;
};

export const getServerSideProps = withDentistRoute(async ({ req, params }) => {
  const id = +(params?.id as string);
  const user = {
    token: req.session.user?.token ?? "",
    admin: req.session.user?.admin ?? false,
  };

  const schedule = {
    id: 1,
    client: { id: 1, name: "foo", age: 23, schedules: [] },
    service: { id: 1, name: "Limpeza", price: 250 },
    dentist: { id: 1, name: "Jane Doe", email: "jane.doe@example.com" },
    startTime: "2022-06-30T13:45",
    endTime: "2022-06-30T14:00",
  };

  const dentist = {
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
  };

  return getServerSidePropsReturn<UpdateProps>({
    user,
    maybe: MaybeAsync(async () => ({
      id,
      schedule,
      dentist,
    })),
    onFailDestination: "/schedules",
  });
});

const Update = ({
  user,
  entity: { dentist, schedule },
}: Props<UpdateProps>) => {
  const { startTime, endTime, onSubmit } = useUpdateSchedule(
    user.token,
    schedule.id,
    _.pick(schedule, ["startTime", "endTime"])
  );

  return (
    <FormPage title="Editar Agendamento" onSubmit={onSubmit}>
      <Field {...startTime} type="datetime-local">
        Data de início
      </Field>
      <Field {...endTime} type="datetime-local">
        Data de fim
      </Field>

      <button className="button">Editar Agendamento</button>
    </FormPage>
  );
};

Update.getLayout = (page: ReactElement, { user }: Props<UpdateProps>) => (
  <Dashboard isAdmin={user.admin}>{page}</Dashboard>
);

export default Update;
