import React from "react";
import Head from "next/head";
import classNames from "classnames";

import styles from "@modules/auth/styles/login.module.css";
import { Field } from "@components";
import { useTextField } from "@hooks";
import { NextPageWithLayout } from "./_app";

const classes = {
  login: classNames(styles.login),
  form: classNames(styles.form, "container", "flow"),
};

const Login: NextPageWithLayout = () => {
  const emailProps = useTextField("");
  const passwordProps = useTextField("");

  return (
    <div className={classes.login}>
      <Head>
        <title>Login</title>
      </Head>
      <form method="GET" className={classes.form}>
        <h1 className={styles.title}>Entrar na sua conta</h1>
        <Field type="email" {...emailProps}>
          E-mail
        </Field>
        <Field type="password" {...passwordProps}>
          Senha
        </Field>

        <button className="button">Entrar na conta</button>
      </form>
    </div>
  );
};

Login.getLayout = (page) => page;

export default Login;
