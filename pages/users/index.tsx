import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { User, useUsersTable } from "@modules/users";
import { AuthenticatedAsAdminPageProps, sessionOptions } from "@modules/auth";
import { sorrisoFacilApi } from "@modules/http/config";
import { withIronSessionSsr as withSession } from "iron-session/next";

export const getServerSideProps = withSession(async ({ req }) => {
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
      .get("/dentists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => data.content)
      .catch(() => []),
    sorrisoFacilApi
      .get("/administrators", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => data.content)
      .catch(() => []),
  ]).then((entities) =>
    entities.reduce((acc, current) => acc.concat(current), [])
  );

  return {
    props: {
      user: req.session.user,
      users,
    },
  };
}, sessionOptions);

type UsersProps = AuthenticatedAsAdminPageProps & { users: User[] };

const Users = ({ users }: UsersProps) => {
  const table = useUsersTable(users);

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
