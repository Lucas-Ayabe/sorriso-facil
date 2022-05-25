import { useRouter } from "next/router";
import { ServiceDto, update } from "../services";
import { useServiceForm } from "./use-service-form";

export const useUpdateService = (
  token: string,
  id: number,
  service: ServiceDto
) => {
  const router = useRouter();
  const { name, price } = useServiceForm(service);

  const onSubmit = async () => {
    const isUpdated = await update(token, id, {
      name: name.value,
      price: price.value === "" ? 0 : price.value,
    });

    if (!isUpdated) {
      alert("Serviço não pode ser atualizado");
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
