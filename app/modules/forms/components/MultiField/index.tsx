import { Key, ReactNode } from "react";
import { MaskedField } from "../MaskedField";

export interface MultiFieldValue {
  id?: string;
  value: string;
}

export interface MultiFieldProps {
  values: MultiFieldValue[];
  mask?: string;
  unmask?: boolean;

  label?: (value: MultiFieldValue, index: number) => string;
  append?: (value: MultiFieldValue, index: number) => ReactNode;
  keyExtractor: (value: MultiFieldValue, index: number) => Key;
  onChange?: (value: MultiFieldValue, index: number) => void;
}

export const MultiField = ({
  values,
  keyExtractor,
  mask = "",
  unmask = false,
  append = () => <></>,
  label = () => "",
  onChange = () => null,
}: MultiFieldProps) => {
  return (
    <>
      {values.map((value, index) => {
        return (
          <MaskedField
            append={append(value, index)}
            mask={mask}
            unmask={unmask}
            key={keyExtractor(value, index)}
            value={value.value}
            onChange={(text) => {
              onChange(
                {
                  id: value.id,
                  value: text,
                },
                index
              );
            }}
          >
            {label(value, index)}
          </MaskedField>
        );
      })}
    </>
  );
};
