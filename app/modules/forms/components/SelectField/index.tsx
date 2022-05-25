import React from "react";
import styles from "../field.module.css";
import { FieldProps } from "../Field";

type OmitProps = "type" | "autoComplete";

export interface SelectFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectFieldProps = Omit<FieldProps, OmitProps> & {
  options?: SelectFieldOption[];
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    inputId = "",
    name = "",
    children = "",
    value = "",
    options = [],
    onChange = () => null,
  } = props;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {children}
      </label>
      <select
        id={inputId}
        name={name}
        className={styles.input}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      >
        {options.map((option) => {
          return (
            <option
              disabled={option.disabled}
              value={option.value}
              key={option.label + option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
