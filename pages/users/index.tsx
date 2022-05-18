import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { User, useUsersTable } from "@modules/users";
import { sorrisoFacilApi } from "@modules/http/config";
import {
  protectedAsAdminRoute,
  AuthenticatedAsAdminPageProps,
} from "@modules/auth";

export const getServerSideProps = protectedAsAdminRoute(async ({ req }) => {
  const { session } = req;
  const hasToken = !!session.user?.token;
  const isAdmin = !!session.user?.admin;
  const isLoggedAsAdmin = hasToken && isAdmin;

  if (!isLoggedAsAdmin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = session.user?.token ?? "";
  const users = await Promise.all([
    sorrisoFacilApi
      .get("/administrators", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) =>
        data.content.map((admin: any) => ({
          ...admin,
          id: `admin-${admin.id}`,
          isAdmin: true,
        }))
      )
      .catch(() => []),
    sorrisoFacilApi
      .get("/dentists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) =>
        data.content.map((dentist: any) => ({
          ...dentist,
          id: `dentist-${dentist.id}`,
          isAdmin: false,
        }))
      )
      .catch(() => []),
  ]).then((entities) => {
    return entities.reduce((acc, current) => acc.concat(current), []);
  });

  return {
    props: {
      user: req.session.user,
      users,
    },
  };
});

type UsersProps = AuthenticatedAsAdminPageProps<{ users: User[] }>;

const Users = ({ users }: UsersProps) => {
  const table = useUsersTable(users);
  console.log(users);

  return (
    <ListPage
      title={{
        singular: "usuário",
        plural: "usuários",
      }}
      resource="users"
      table={table}
    />
  );
};

Users.getLayout = (page: ReactElement, { user }: UsersProps) => {
  return <Dashboard isAdmin={user.admin}>{page}</Dashboard>;
};

export default Users;
