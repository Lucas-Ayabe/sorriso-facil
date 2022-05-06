import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import styles from "./dashboard.module.css";
import {
  CgMenu,
  CgEnter,
  CgCalendar,
  CgBriefcase,
  CgUser,
} from "react-icons/cg";

const baseClasses = {
  dashboard: {
    wrapper: classNames(styles.dashboard),
    content: classNames(styles.dashboard__content),
    page: classNames(styles.dashboard__page, "container"),
  },
  sidebar: {
    brand: classNames(styles.sidebar__brand),
    menu: classNames(styles.sidebar__menu, "flow"),
    item: classNames(styles.sidebar__item),
    link: classNames(styles.sidebar__link),
  },
};

export const Dashboard = ({ children }: PropsWithChildren<{}>) => {
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
      <nav className={sidebar.wrapper}>
        <a href="#" className={sidebar.brand}>
          Sorriso Simples
        </a>
        <ul className={sidebar.menu}>
          <li className={sidebar.item}>
            <a href="#" className={sidebar.link}>
              <CgCalendar />
              <span>Agenda</span>
            </a>
          </li>
          <li className={sidebar.item}>
            <a href="#" className={sidebar.link}>
              <CgBriefcase />
              <span>Serviços</span>
            </a>
          </li>
          <li className={sidebar.item}>
            <a href="#" className={sidebar.link}>
              <CgUser />
              <span>Clientes</span>
            </a>
          </li>
        </ul>

        <div className={sidebar.item}>
          <a href="#" className={sidebar.link}>
            <CgEnter />
            <span>Sair</span>
          </a>
        </div>
      </nav>

      <div className={dashboard.content}>
        <div className={dashboard.page}>{children}</div>
      </div>
    </div>
  );
};
