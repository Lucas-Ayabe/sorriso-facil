import { withIronSessionSsr as withSession } from "iron-session/next";
import { GetServerSideProps } from "next";
import { sessionOptions } from "../config";

export type AuthenticatedPageProps<T = {}> = {
  user: { admin: boolean; token: string };
} & T;

export const withAdminRoute = (handler: GetServerSideProps) => {
  return withSession(async (ctx) => {
    const { session } = ctx.req;
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

    return handler(ctx);
  }, sessionOptions);
};

export const withDentistRoute = (handler: GetServerSideProps) => {
  return withSession(async (ctx) => {
    const { session } = ctx.req;
    const hasToken = !!session.user?.token;
    const isAdmin = !!session.user?.admin;
    const isLoggedAsDentist = hasToken && !isAdmin;

    if (!isLoggedAsDentist) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return handler(ctx);
  }, sessionOptions);
};

export const defaultHandler = async (ctx: any) => {
  return {
    props: {
      user: ctx.req.session.user,
    },
  };
};
