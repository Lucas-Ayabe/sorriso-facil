import {
  Action,
  columnFormatters as as,
  useDataTable,
  Column,
} from "@modules/data";
import { useRouter } from "next/router";
import { CgPen, CgTrash } from "react-icons/cg";
import { Service } from "../service.slice";
import { deleteById } from "../services";

const columns: Column<keyof Service>[] = [
  {
    acessor: "name",
    label: "Nome",
    format: as.string,
  },
  {
    acessor: "price",
    label: "Preço",
    format: (price: number) => {
      return price.toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency",
      });
    },
  },
];

export const useServicesTable = (token: string, data: Service[]) => {
  const router = useRouter();
  const actions: Action<Service>[] = [
    {
      id: "update-service",
      icon: CgPen,
      text: "Atualizar serviço",
      onClick(item) {
        router.push(`/services/update/${item.id}`);
      },
    },
    {
      id: "delete-service",
      icon: CgTrash,
      text: "Excluir serviço",
      onClick(service) {
        const confirmDelete = window.confirm("Realmente deseja excluir?");

        if (confirmDelete) {
          deleteById(token, service.id);
          router.reload();
        }
      },
    },
  ];

  return useDataTable<Service>({ columns, data, actions });
};
