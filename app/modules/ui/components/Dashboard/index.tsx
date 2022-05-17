import styles from "./dashboard.module.css";

import { PropsWithChildren, useState } from "react";
import { CgMenu, CgEnter } from "react-icons/cg";
import Link from "next/link";
import classNames from "classnames";

import { routes as appRoutes } from "@/routes";
import { useLoggedUser } from "@modules/auth";

const baseClasses = {
  dashboard: {
    wrapper: classNames(styles.dashboard),
    content: classNames(styles.dashboard__content),
    header: classNames(styles.dashboard__header),
    page: classNames(styles.dashboard__page, "container"),
  },
  sidebar: {
    brand: classNames(styles.sidebar__brand),
    placeholder: classNames(styles.sidebar__placeholder),
    menu: classNames(styles.sidebar__menu, "flow"),
    item: classNames(styles.sidebar__item),
    link: classNames(styles.sidebar__link),
  },
};

export const Dashboard = ({ children }: PropsWithChildren<{}>) => {
  const [loggedUser] = useLoggedUser();
  const routes = loggedUser.admin ? appRoutes.admin : appRoutes.dentist;
  const [open, setOpen] = useState(false);
  const { dashboard, sidebar } = {
    ...baseClasses,
    sidebar: {
      ...baseClasses.sidebar,
      wrapper: classNames(styles.sidebar, {
        [styles.isOpen]: open,
      }),
    },
  };

  return (
    <div className={dashboard.wrapper}>
      <button onClick={() => setOpen((i) => !i)} className={styles.hamburger}>
        <CgMenu size="1.5em" />
      </button>

      <div className={sidebar.placeholder}> </div>

      <nav className={sidebar.wrapper}>
        <a href="#" className={sidebar.brand}>
          Sorriso Simples
        </a>
        <ul className={sidebar.menu}>
          {routes.map(({ icon: Icon, route, text }) => (
            <li key={route + text} className={sidebar.item}>
              <Link href={route} passHref>
                <a className={sidebar.link}>
                  <Icon />
                  <span>{text}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div className={sidebar.item}>
          <a href="#" className={sidebar.link}>
            <CgEnter />
            <span>Sair</span>
          </a>
        </div>
      </nav>

      <div className={dashboard.header}></div>
      <div className={dashboard.content}>
        <div className={dashboard.page}>{children}</div>
      </div>
    </div>
  );
};
