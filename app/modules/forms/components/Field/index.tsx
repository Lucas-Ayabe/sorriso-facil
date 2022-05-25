import React from "react";
import styles from "../field.module.css";

export interface FieldProps {
  inputId?: string;
  name?: string;
  children?: string;
  autoComplete?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Field = React.forwardRef<any, FieldProps>(
  (props: FieldProps, ref) => {
    const {
      inputId = "",
      name = "",
      autoComplete = "",
      type = "text",
      children = "",
      value = "",
      onChange = () => null,
    } = props;

    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={inputId}>
          {children}
        </label>
        <input
          ref={ref}
          id={inputId}
          autoComplete={autoComplete}
          name={name}
          className={styles.input}
          type={type}
          value={value}
          onChange={({ target }) => onChange(target.value)}
        />
      </div>
    );
  }
);

Field.displayName = "Field";
