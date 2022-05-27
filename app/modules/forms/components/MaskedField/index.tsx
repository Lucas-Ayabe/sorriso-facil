import React from "react";
import { IMaskInput } from "react-imask";
import { FieldProps } from "../Field";
import styles from "../field.module.css";

export interface MaskedFieldProps extends Omit<FieldProps, "type"> {
  mask: string;
  unmask?: boolean;
  append?: React.ReactNode;
}

export const MaskedField = (props: MaskedFieldProps) => {
  const {
    inputId = "",
    name = "",
    autoComplete = "",
    children = "",
    append = <></>,
    value = "",
    onChange = () => null,
    mask,
    unmask = false,
  } = props;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {children}
      </label>
      <div className={styles.inputWrapper}>
        <IMaskInput
          className={styles.input}
          id={inputId}
          name={name}
          autoComplete={autoComplete}
          unmask={unmask}
          mask={mask}
          value={value}
          onAccept={(val) => onChange(val as string)}
        />
        {append}
      </div>
    </div>
  );
};
