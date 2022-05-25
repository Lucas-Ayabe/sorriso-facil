import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { withDentistRoute, AuthenticatedPageProps } from "@modules/auth";
import { useServicesTable, findAll, Service } from "@modules/services";

export const getServerSideProps = withDentistRoute(async (ctx) => {
  return {
    props: {
      user: ctx.req.session.user,
      services: await findAll(ctx.req.session.user?.token ?? ""),
    },
  };
});

type ServicesProps = AuthenticatedPageProps & {
  services: Service[];
};

const Services = ({ user, services }: ServicesProps) => {
  const table = useServicesTable(user.token, services);

  return (
    <ListPage
      title={{
        singular: "serviço",
        plural: "serviços",
      }}
      resource="services"
      table={table}
    />
  );
};

Services.getLayout = (page: ReactElement, { user }: ServicesProps) => {
  return <Dashboard isAdmin={user.admin}>{page}</Dashboard>;
};

export default Services;
