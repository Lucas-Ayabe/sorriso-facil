import _ from "lodash";
import React, { ChangeEventHandler } from "react";
import { FieldProps } from "../Field";
import styles from "../field.module.css";

export type NumberFieldProps = Omit<
  FieldProps,
  "value" | "onChange" | "type"
> & {
  value?: number | "";
  onChange?: (value: number | "") => void;
};

type ChangeHandler = ChangeEventHandler<HTMLInputElement>;

export const NumberField = ({
  inputId = "",
  name = "",
  autoComplete = "",
  children = "",
  value = 0,
  onChange = () => null,
}: NumberFieldProps) => {
  const handleChange: ChangeHandler = ({ target }) => {
    if (target.value === "") onChange(target.value);
    if (!_.isNaN(target.valueAsNumber)) {
      onChange(target.valueAsNumber);
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {children}
      </label>
      <input
        id={inputId}
        autoComplete={autoComplete}
        name={name}
        className={styles.input}
        type="number"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
