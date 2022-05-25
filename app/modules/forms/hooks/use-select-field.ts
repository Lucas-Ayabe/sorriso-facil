import { SelectFieldOption, SelectFieldProps } from "../components";
import { useField } from "./use-field";

export const useSelectField = (
  options: SelectFieldOption[],
  initialValue?: string
): SelectFieldProps => {
  const field = useField<string>(initialValue ?? options[0].value ?? "");

  return {
    ...field,
    options,
  };
};
