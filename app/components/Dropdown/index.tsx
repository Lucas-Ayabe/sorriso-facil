import React from "react";
import { Menu } from "@headlessui/react";
import { IconType } from "react-icons";
import { CgMoreVerticalAlt } from "react-icons/cg";
import classNames from "classnames";

import { FadeInTranstion } from "@modules/animations";
import styles from "./dropdown.module.css";

export interface DropdownOption {
  icon: IconType;
  text: string;
  id: string;
  onClick?: () => void;
}

export interface DropdownProps {
  options: DropdownOption[];
  position?: Partial<{
    top: number | string;
    left: number | string;
    right: number | string;
    bottom: number | string;
  }>;
}

export const Dropdown = ({ options, position }: DropdownProps) => {
  return (
    <Menu as="div" className={styles.dropdown}>
      <div>
        <Menu.Button className="button--small">
          <CgMoreVerticalAlt aria-hidden="true" />
        </Menu.Button>
      </div>

      <FadeInTranstion>
        <Menu.Items className={classNames(styles.items)} style={position}>
          {options?.map(({ id, text, icon: Icon, onClick }) => (
            <div key={id} className={classNames("divider", styles.item)}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onClick}
                    className={classNames(styles.option, {
                      [styles.active]: active,
                    })}
                  >
                    <span className={styles.icon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <span className={styles.text}>{text}</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </FadeInTranstion>
    </Menu>
  );
};
