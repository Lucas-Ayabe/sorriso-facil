import React from "react";
import { Field } from "@modules/forms";

const UserForm = () => {
  return (
    <form method="POST" className="card flow">
      <h1>Entre na sua conta</h1>
      <Field type="email" inputId="login-email">
        E-mail
      </Field>
      <Field
        autoComplete="currentPassword"
        type="password"
        inputId="login-password"
      >
        Senha
      </Field>
      <button className="button--small">Entrar na conta</button>
    </form>
  );
};

export default UserForm;
