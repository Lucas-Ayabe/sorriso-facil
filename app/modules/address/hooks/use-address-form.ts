import { SelectFieldOption, useField, useSelectField } from "@modules/forms";
import { brazilianStates } from "../constants";

const options: SelectFieldOption[] = [
  { label: "Escolha um estado", value: "", disabled: true },
  ...brazilianStates.map((state) => ({
    label: state.name,
    value: state.abbreviation,
  })),
];

export type UseAddressFormProps = Partial<{
  street: string;
  neighborhood: string;
  number: number | "";
  city: string;
  state: string;
  cep: string;
}>;

export const defaultProps: UseAddressFormProps = {
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
  const stateField = useSelectField({ options, initialValue: state });
  const cepField = useField(cep);

  return {
    street: streetField,
    neighborhood: neighborhoodField,
    number: numberField,
    city: cityField,
    state: stateField,
    cep: { ...cepField, mask: "00000-000" },
  };
};
