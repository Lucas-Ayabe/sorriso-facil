import React from "react";
import Head from "next/head";

import { FormPageHeader } from "./FormPageHeader";

export interface FormPageProps {
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void | Promise<void>;
}

export const FormPage = (props: FormPageProps) => {
  const { title, children, onSubmit = () => null } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flow">
        <FormPageHeader {...props} />
        <div />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="card--lg flow"
          method="POST"
        >
          {children}
        </form>
      </div>
    </>
  );
};
