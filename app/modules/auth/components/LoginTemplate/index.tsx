import styles from "./login-template.module.css";

import React, { PropsWithChildren } from "react";
import classNames from "classnames";

const classes = {
  wrapper: classNames(styles.loginTemplate, "container"),
};

export const LoginTemplate = ({ children }: PropsWithChildren<{}>) => {
  return <div className={classes.wrapper}>{children}</div>;
};
