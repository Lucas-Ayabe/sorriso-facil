import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { withDentistRoute, AuthenticatedPageProps } from "@modules/auth";
import { useSchedulesTable, findAll, Schedule } from "@modules/schedules";

export const getServerSideProps = withDentistRoute(async (ctx) => {
  return {
    props: {
      user: ctx.req.session.user,
      schedules: await findAll(ctx.req.session.user?.token ?? ""),
    },
  };
});

type SchedulesProps = AuthenticatedPageProps & {
  schedules: Schedule[];
};

const Schedules = ({ user, schedules }: SchedulesProps) => {
  const table = useSchedulesTable(user.token, schedules);

  return (
    <ListPage
      title={{
        singular: "agendamento",
        plural: "agendamentos",
      }}
      resource="schedules"
      table={table}
    />
  );
};

Schedules.getLayout = (page: ReactElement, { user }: SchedulesProps) => {
  return <Dashboard isAdmin={user.admin}>{page}</Dashboard>;
};

export default Schedules;
