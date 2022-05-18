import { Action, columnFormatters as as } from "@modules/data";
import { useDataTable } from "@modules/data/hooks/use-data-table";
import { Column } from "@modules/data/types";
import { useRouter } from "next/router";
import { CgPen, CgTrash } from "react-icons/cg";
import { User } from "../user.slice";

const columns: Column<keyof User>[] = [
  {
    acessor: "name",
    label: "Nome",
    format: as.string,
  },
  {
    acessor: "isAdmin",
    label: "Cargo",
    format: (admin: boolean) => (admin ? "Administrador" : "Dentista"),
  },
  {
    acessor: "email",
    label: "E-mail",
    format: as.string,
  },
];

export const useUsersTable = (data: User[]) => {
  const router = useRouter();
  const actions: Action<User>[] = [
    {
      id: "update-user",
      icon: CgPen,
      text: "Atualizar usuário",
      onClick: (user) => {
        const resource = user.isAdmin ? "admin" : "dentist";
        router.push(`/users/update/${resource}/${user.id}`);
      },
    },
    {
      id: "delete-user",
      icon: CgTrash,
      text: "Excluir usuário",
    },
  ];

  return useDataTable<User>({ columns, data, actions });
};
