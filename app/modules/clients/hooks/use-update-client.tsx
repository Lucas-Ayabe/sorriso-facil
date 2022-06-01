import { useRouter } from "next/router";

import { telephoneDto, toString } from "@modules/telephones";
import { getFieldsData } from "@modules/forms";
import { updateById } from "../services";
import { useClientForm } from "./use-client-form";
import { CompleteClient } from "../client.slice";

export const useUpdateClient = (
  token: string,
  id: number,
  client: CompleteClient
) => {
  const router = useRouter();
  const clientForm = useClientForm({
    ...client,
    address: client.contacts?.address,
    telephones: (client.contacts?.telephones ?? []).map((telephone) => ({
      id: telephone.id.toString(),
      value: toString(telephone),
    })),
  });

  const { name, age, address, telephones } = clientForm;
  const onSubmit = async () => {
    await updateById(token, id, {
      id,
      name: name.value,
      age: age.value === "" ? 0 : age.value,
      contacts: {
        address: {
          ...getFieldsData(address),
          country: "Brasil",
          id: client.contacts?.address.id ?? 0,
        },
        telephones: telephones.values.map(({ id: telephoneId, value }) => ({
          id: +(telephoneId ?? "0"),
          ...telephoneDto(value),
        })),
      },
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
