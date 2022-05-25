import { useRouter } from "next/router";
import { CgDetailsMore, CgPen, CgTrash } from "react-icons/cg";
import {
  Action,
  columnFormatters as as,
  useDataTable,
  Column,
} from "@modules/data";
import { CompleteClient, modalOpened } from "../client.slice";
import { useAppDispatch } from "@hooks";

const columns: Column<keyof CompleteClient>[] = [
  {
    acessor: "name",
    label: "Nome",
    format: as.string,
  },
  {
    acessor: "age",
    label: "Idade",
    format: as.string,
  },
];

export const useClientsTable = (token: string, data: CompleteClient[]) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const actions: Action<CompleteClient>[] = [
    {
      id: "view-client",
      icon: CgDetailsMore,
      text: "Detalhes do cliente",
      onClick(item) {
        dispatch(modalOpened(item));
      },
    },
    {
      id: "update-client",
      icon: CgPen,
      text: "Atualizar cliente",
      onClick(item) {
        router.push(`/clients/update/${item.id}`);
      },
    },
    {
      id: "delete-client",
      icon: CgTrash,
      text: "Excluir cliente",
      onClick(client) {
        const confirmDelete = window.confirm("Realmente deseja excluir?");

        if (confirmDelete) {
          // deleteById(token, client.id);
          router.reload();
        }
      },
    },
  ];

  return useDataTable<CompleteClient>({ columns, data, actions });
};
