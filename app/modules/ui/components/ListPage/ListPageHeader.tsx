import styles from "./list-page-header.module.css";

import React from "react";
import Link from "next/link";
import { CgList } from "react-icons/cg";
import { ListPageProps } from "./ListPage";

import classNames from "classnames";

const classes = {
  wrapper: classNames(styles.listPageHeader),
  title: classNames(styles.listPageHeader__title),
};

export const ListPageHeader = <T extends {}>({
  title,
  resource,
}: ListPageProps<T>) => {
  return (
    <header className={classes.wrapper}>
      <h1 className={classes.title}>
        <CgList color="var(--primary-color)" />
        <span style={{ marginLeft: "0.5em" }}>Listar {title.plural}</span>
      </h1>

      <Link passHref href={`/${resource}/create`}>
        <a className="button">Criar Novo {title.singular}</a>
      </Link>
    </header>
  );
};
