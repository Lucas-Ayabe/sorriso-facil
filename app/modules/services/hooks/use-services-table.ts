import {
  Action,
  columnFormatters as as,
  useDataTable,
  Column,
} from "@modules/data";
import { useRouter } from "next/router";
import { CgPen, CgTrash } from "react-icons/cg";
import { Service } from "../service.slice";

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

export const useServicesTable = (data: Service[]) => {
  const actions: Action<Service>[] = [
    {
      id: "update-service",
      icon: CgPen,
      text: "Atualizar serviço",
    },
    {
      id: "delete-service",
      icon: CgTrash,
      text: "Excluir serviço",
    },
  ];

  return useDataTable<Service>({ columns, data, actions });
};
