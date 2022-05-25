import { useField } from "@modules/forms";

export interface UseServiceFormPros {
  name: string;
  price: number | "";
}

export const useServiceForm = (
  { name, price }: UseServiceFormPros = { name: "", price: 0 }
) => {
  const nameField = useField(name);
  const priceField = useField<number | "">(price);

  return {
    name: nameField,
    price: priceField,
  };
};
