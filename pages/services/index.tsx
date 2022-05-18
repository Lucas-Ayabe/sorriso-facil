import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { sorrisoFacilApi } from "@modules/http/config";
import {
  dentistRoute,
  AuthenticatedAsAdminPageProps,
  defaultHandler,
} from "@modules/auth";
import { useServicesTable } from "@modules/services";

export const getServerSideProps = dentistRoute(defaultHandler);

type ServicesProps = AuthenticatedAsAdminPageProps;

const Services = () => {
  const table = useServicesTable([]);

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
