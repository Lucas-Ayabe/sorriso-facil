import { useRouter } from "next/router";
import { create } from "../services";
import { useServiceForm } from "./use-service-form";

export const useCreateService = (token: string) => {
  const router = useRouter();
  const { name, price } = useServiceForm();

  const onSubmit = async () => {
    const isCreated = await create(token, {
      name: name.value,
      price: price.value === "" ? 0 : price.value,
    });

    if (!isCreated) {
      alert("Serviço não pode ser cadastrado");
    } else {
      router.push("/services");
    }
  };

  return {
    name,
    price,
    onSubmit,
  };
};
