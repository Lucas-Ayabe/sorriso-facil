import React, { FormEventHandler } from "react";
import classNames from "classnames";
import styles from "./login-form.module.css";
import { Field, FieldProps } from "@modules/forms";

const classes = {
  login: classNames(styles.login),
  form: classNames(styles.loginForm, "card", "flow"),
};

type FieldConfig = Omit<FieldProps, "children" | "type">;

export interface LoginFormProps {
  email: FieldConfig;
  password: FieldConfig;
  onLogin?: (email: string, password: string) => void;
}

export const LoginForm = ({
  email,
  password,
  onLogin = () => null,
}: LoginFormProps) => {
  const doLogin: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onLogin(email.value ?? "", password.value ?? "");
  };

  return (
    <form method="POST" className={classes.form} onSubmit={doLogin}>
      <h1>Entre na sua conta</h1>
      <Field {...email} type="email">
        E-mail
      </Field>
      <Field {...password} type="password">
        Senha
      </Field>
      <button className="button--small">Entrar na conta</button>
    </form>
  );
};
