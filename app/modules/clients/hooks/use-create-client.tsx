import { useRouter } from "next/router";

import { telephoneDto } from "@modules/telephones";
import { getFieldsData } from "@modules/forms";
import { create } from "../services";
import { useClientForm } from "./use-client-form";

export const useCreateClient = (token: string) => {
  const router = useRouter();
  const clientForm = useClientForm();
  const { name, age, address, telephones } = clientForm;

  const onSubmit = async () => {
    await create(token, {
      name: name.value,
      age: age.value === "" ? 0 : age.value,
      address: { ...getFieldsData(address), country: "Brasil" },
      telephones: telephones.values.map(({ value }) => telephoneDto(value)),
    });

    router.push("/clients");
  };

  return {
    name,
    age,
    ...address,
    telephones,
    onSubmit,
  };
};
