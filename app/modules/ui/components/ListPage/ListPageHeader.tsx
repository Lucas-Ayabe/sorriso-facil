import styles from "./list-page-header.module.css";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CgList } from "react-icons/cg";
import { ListPageProps } from "./ListPage";

import classNames from "classnames";
import { useMediaQuery } from "usehooks-ts";

const classes = {
  wrapper: classNames(styles.listPageHeader),
  title: classNames(styles.listPageHeader__title),
};

export const ListPageHeader = <T extends {}>({
  title,
  resource,
}: ListPageProps<T>) => {
  const [addButtonText, setAddButtonText] = useState("+");
  const [showIcon, setShowIcon] = useState(false);
  const isSmall = useMediaQuery("(max-width: 568px)");

  useEffect(() => {
    setShowIcon(!isSmall);
    setAddButtonText(isSmall ? "+" : `Criar Novo ${title.singular}`);
  }, [isSmall, title.singular]);

  return (
    <header className={classes.wrapper}>
      <h1 className={classes.title}>
        {showIcon && <CgList color="var(--primary-color)" />}
        <span style={{ marginLeft: "0.5em" }}>Listar {title.plural}</span>
      </h1>

      <Link passHref href={`/${resource}/create`}>
        <a className="button">{addButtonText}</a>
      </Link>
    </header>
  );
};
