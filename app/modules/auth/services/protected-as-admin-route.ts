import { withIronSessionSsr as withSession } from "iron-session/next";
import { sessionOptions } from "../config";

export interface AuthenticatedAsAdminPageProps {
  user: { admin: boolean; token: string };
}

export const protectedAsAdminRoute = withSession(async ({ req }) => {
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

  return {
    props: {
      user: req.session.user,
    },
  };
}, sessionOptions);
