import { columnFormatters as as } from "@modules/data";
import { useDataTable } from "@modules/data/hooks/use-data-table";
import { Column } from "@modules/data/types";
import { CgPen, CgTrash, CgUser } from "react-icons/cg";
import { User } from "../user.slice";
import { useUsers } from "./use-users";

const columns: Column<keyof User>[] = [
  {
    acessor: "id",
    label: "#",
    format: as.string,
  },
  {
    acessor: "email",
    label: "E-mail",
    format: as.string,
  },
  {
    acessor: "name",
    label: "Nome",
    format: as.string,
  },
];

const actions = [
  {
    id: "view-user",
    icon: CgUser,
    text: "Visualizar detalhes",
  },
  {
    id: "update-user",
    icon: CgPen,
    text: "Atualizar usuário",
  },
  {
    id: "delete-user",
    icon: CgTrash,
    text: "Excluir usuário",
  },
];

export const useUsersTable = (data: User[]) => {
  return useDataTable<User>({ columns, data, actions });
};
