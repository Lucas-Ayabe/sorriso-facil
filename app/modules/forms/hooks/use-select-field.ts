import { SelectFieldOption, SelectFieldProps } from "../components";
import { useField } from "./use-field";

export interface UseSelectFieldProps {
  options: SelectFieldOption[];
  initialValue?: string;
}

export const useSelectField = ({
  options,
  initialValue,
}: UseSelectFieldProps): SelectFieldProps => {
  const field = useField<string>(initialValue ?? options[0]?.value ?? "");

  return {
    ...field,
    options,
  };
};
