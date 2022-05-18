import styles from "./form-page-header.module.css";

import React from "react";
import { CgClipboard } from "react-icons/cg";
import { FormPageProps } from "./FormPage";

import classNames from "classnames";

const classes = {
  wrapper: classNames(styles.listPageHeader),
  title: classNames(styles.listPageHeader__title),
};

export const FormPageHeader = ({ title }: FormPageProps) => {
  return (
    <header className={classes.wrapper}>
      <h1 className={classes.title}>
        <CgClipboard color="var(--primary-color)" />
        <span style={{ marginLeft: "0.5em" }}>{title}</span>
      </h1>
    </header>
  );
};
