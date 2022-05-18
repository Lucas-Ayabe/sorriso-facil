import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { User, useUsersTable } from "@modules/users";
import { adminRoute, AuthenticatedPageProps } from "@modules/auth";
import * as UserService from "@modules/users/services/user.service";

export const getServerSideProps = adminRoute(async ({ req }) => {
  const { user = { token: "", admin: false } } = req.session;

  return {
    props: {
      user: req.session.user,
      users: await UserService.findAll(user.token),
    },
  };
});

type UsersProps = AuthenticatedPageProps<{ users: User[] }>;

const Users = ({ users, user }: UsersProps) => {
  const table = useUsersTable(users, user.token);

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
