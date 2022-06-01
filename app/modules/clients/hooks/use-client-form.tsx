import { CgClose } from "react-icons/cg";

import {
  useAddressForm,
  UseAddressFormProps,
  defaultProps as addressDefaultProps,
} from "@modules/address";
import { MultiFieldValue, useField, useMultiField } from "@modules/forms";

type UseClientFormProps = Partial<{
  name: string;
  age: number | "";
  address: UseAddressFormProps;
  telephones: MultiFieldValue[];
}>;

const defaultProps: UseClientFormProps = {
  name: "",
  age: "",
  address: addressDefaultProps,
  telephones: [],
};

export const useClientForm = ({
  name = "",
  age = "",
  address = addressDefaultProps,
  telephones = [],
}: UseClientFormProps = defaultProps) => {
  const nameField = useField(name);
  const ageField = useField<number | "">(age);
  const addressField = useAddressForm(address);
  const telephonesField = useMultiField(telephones);

  return {
    name: nameField,
    age: ageField,
    address: addressField,
    telephones: {
      ...telephonesField,
      mask: "(00) 00000-0000",
      append: (_: any, index: number) => {
        return index !== 0 ? (
          <button
            type="button"
            onClick={() => telephonesField.removeField(index)}
            className="button--small"
          >
            <CgClose />
          </button>
        ) : null;
      },
    },
  };
};
