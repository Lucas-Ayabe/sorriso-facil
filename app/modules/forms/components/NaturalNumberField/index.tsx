import _ from "lodash";
import React from "react";
import { Field } from "../Field";
import { NumberFieldProps } from "../NumberField";

export type NaturalNumberFieldProps = NumberFieldProps;

const isEmptyString = (value: unknown): value is "" => value === "";

export const NaturalNumberField = (props: NaturalNumberFieldProps) => {
  const { onChange = () => null, value = 0 } = props;
  const handleChange = (val: string) => {
    if (!["e", "-", ",", "."].includes(val)) {
      if (isEmptyString(val)) return onChange(val);
      onChange(+val.replace(/\D/g, ""));
    }
  };

  return <Field {...props} value={value.toString()} onChange={handleChange} />;
};
