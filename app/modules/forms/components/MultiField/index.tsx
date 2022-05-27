import { Key, ReactNode } from "react";
import { MaskedField } from "../MaskedField";

export interface MultiFieldProps {
  values: string[];
  mask?: string;
  unmask?: boolean;

  label?: (value: string, index: number) => string;
  append?: (value: string, index: number) => ReactNode;
  keyExtractor: (value: string, index: number) => Key;
  onChange?: (value: string, index: number) => void;
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
            value={value}
            onChange={(text) => onChange(text, index)}
          >
            {label(value, index)}
          </MaskedField>
        );
      })}
    </>
  );
};
