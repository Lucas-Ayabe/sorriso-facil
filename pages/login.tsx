import React from "react";
import Head from "next/head";

import { NextPageWithLayout } from "@types";
import {
  LoginForm,
  LoginTemplate,
  useLoginForm,
  withSessionRoute,
} from "@modules/auth";
import { Maybe } from "purify-ts";

export const getServerSideProps = withSessionRoute(async ({ req }) => {
  return Maybe.fromNullable(req.session.user).caseOf<any>({
    Just: (user) => {
      return {
        redirect: {
          destination: user.admin ?? false ? "/users" : "/services",
          permanent: false,
        },
      };
    },
    Nothing: () => {
      return {
        props: {},
      };
    },
  });
});

const Login: NextPageWithLayout = () => {
  const loginForm = useLoginForm((isAdmin) => {
    return isAdmin ? "/users" : "/services";
  });

  return (
    <LoginTemplate>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm {...loginForm} />
    </LoginTemplate>
  );
};

Login.getLayout = (page) => page;

export default Login;
