import { useIMask } from "react-imask";
import { SelectFieldOption, useField, useSelectField } from "@modules/forms";
import { brazilianStates } from "../constants";
import { useEffect } from "react";

const options: SelectFieldOption[] = [
  { label: "Escolha um estado", value: "", disabled: true },
  ...brazilianStates.map((state) => ({
    label: state.name,
    value: state.abbreviation,
  })),
];

type UseAddressFormProps = Partial<{
  street: string;
  neighborhood: string;
  number: number | "";
  city: string;
  state: string;
  cep: string;
}>;

const defaultProps: UseAddressFormProps = {
  street: "",
  neighborhood: "",
  number: "",
  city: "",
  state: "",
  cep: "",
};

export const useAddressForm = (props = defaultProps) => {
  const {
    street = "",
    neighborhood = "",
    number = "",
    city = "",
    state = "",
    cep = "",
  } = props;

  const streetField = useField(street);
  const neighborhoodField = useField(neighborhood);
  const numberField = useField<number | "">(number);
  const cityField = useField(city);
  const stateField = useSelectField(options, state);
  const cepField = useIMask({ mask: "00000-000" });

  useEffect(() => {
    cepField.setValue(cep);
  }, [cep, cepField]);

  return {
    street: streetField,
    neighborhood: neighborhoodField,
    number: numberField,
    city: cityField,
    state: stateField,
    cep: {
      ref: cepField.ref,
      value: cepField.value,
      onChange: cepField.setValue,
    },
  };
};
