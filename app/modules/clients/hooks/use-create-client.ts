import { useAddressForm } from "@modules/address";
import { useField } from "@modules/forms";
import { useRouter } from "next/router";
import { create } from "../services";

export const useCreateClient = (token: string) => {
  const router = useRouter();

  const name = useField("");
  const age = useField<number | "">("");
  const address = useAddressForm();

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

    console.log({ ...clientData, ...addressData });

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
    onSubmit,
  };
};
