import { ReactElement } from "react";

import {
  withDentistRoute,
  Props,
  getServerSidePropsReturn,
} from "@modules/auth";
import { Dashboard, FormPage } from "@modules/ui";
import { Field } from "@modules/forms";
import { findLogged, Dentist } from "@modules/dentist";
import {
  DateTimeTuple,
  findById,
  Schedule,
  useUpdateSchedule,
} from "@modules/schedules";
import { MaybeAsync } from "purify-ts";
import _ from "lodash";
import { formatTolocalDate } from "@";

type UpdateProps = {
  id: number;
  schedule: Schedule;
  dentist: Dentist;
};

export const getServerSideProps = withDentistRoute(async ({ req, params }) => {
  const id = +(params?.id as string);
  const user: { token: string; admin: boolean } = {
    token: req.session.user?.token ?? "",
    admin: req.session.user?.admin ?? false,
  };

  return getServerSidePropsReturn<UpdateProps>({
    user,
    maybe: MaybeAsync(async ({ liftMaybe }) => {
      const dentist = await liftMaybe(await findLogged(user.token));
      const schedule = await liftMaybe(await findById(user.token, id));
      return {
        id,
        dentist,
        schedule,
      };
    }),
    onFailDestination: "/schedules",
  });
});

const Update = ({ user, entity: { schedule } }: Props<UpdateProps>) => {
  const { startTime, endTime, onSubmit } = useUpdateSchedule(
    user.token,
    schedule.id,
    _.mapValues(_.pick(schedule, ["startTime", "endTime"]), formatTolocalDate)
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
