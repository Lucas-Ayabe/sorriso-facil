import React from "react";
import Head from "next/head";

import { NextPageWithLayout } from "@types";
import { LoginForm, LoginTemplate, useLoginForm } from "@modules/auth";
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
