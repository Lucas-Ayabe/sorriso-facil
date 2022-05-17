import React from "react";
import styles from "./field.module.css";

export interface FieldProps {
  inputId?: string;
  name?: string;
  children?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Field = ({
  inputId = "",
  name = "",
  type = "text",
  children = "",
  value = "",
  onChange = () => null,
}: FieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {children}
      </label>
      <input
        id={inputId}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};
