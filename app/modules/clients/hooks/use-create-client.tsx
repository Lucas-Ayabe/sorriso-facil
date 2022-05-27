import { useAddressForm } from "@modules/address";
import { useField, useMultiField } from "@modules/forms";
import { useRouter } from "next/router";
import { CgClose } from "react-icons/cg";
import { create } from "../services";

export const useCreateClient = (token: string) => {
  const router = useRouter();

  const name = useField("");
  const age = useField<number | "">("");
  const address = useAddressForm();
  const telephones = useMultiField();

  const onSubmit = async () => {
    const clientData = {
      name: name.value,
      age: age.value,
    };

    const addressData = {
      street: address.street.value,
      neighborhood: address.neighborhood.value,
      number: address.number.value,
      city: address.city.value,
      state: address.state.value,
      cep: address.cep.value,
    };

    console.log({
      client: clientData,
      address: addressData,
      telephones: telephones.values,
    });

    // await create(token, {
    //   name: name.value,
    //   age: age.value === "" ? 0 : age.value,
    // });
    //
    // router.push("/clients");
  };

  return {
    name,
    age: {
      value: age.value,
      onChange: age.onChange,
    },
    ...address,
    telephones: {
      ...telephones,
      mask: "(00) 00000-0000",
      append: (_: any, index: number) => {
        return index !== 0 ? (
          <button
            type="button"
            onClick={() => telephones.removeField(index)}
            className="button--small"
          >
            <CgClose />
          </button>
        ) : null;
      },
    },
    onSubmit,
  };
};
