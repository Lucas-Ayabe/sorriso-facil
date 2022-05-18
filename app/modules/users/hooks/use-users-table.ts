import { Action, columnFormatters as as } from "@modules/data";
import { useDataTable } from "@modules/data/hooks/use-data-table";
import { Column } from "@modules/data/types";
import { useRouter } from "next/router";
import { CgPen, CgTrash } from "react-icons/cg";
import { User } from "../user.slice";
import * as UserService from "../services/user.service";

const numberId = (id: string | number) => {
  const [, userId] = id.toString().split("-");
  return +userId;
};

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

export const useUsersTable = (data: User[], token: string) => {
  const router = useRouter();
  const actions: Action<User>[] = [
    {
      id: "update-user",
      icon: CgPen,
      text: "Atualizar usuário",
      onClick: (user) => {
        const resource = user.isAdmin ? "admin" : "dentist";
        const id = numberId(user.id);
        router.push(`/users/update/${resource}/${id}`);
      },
    },
    {
      id: "delete-user",
      icon: CgTrash,
      text: "Excluir usuário",
      onClick: async (user) => {
        const id = numberId(user.id);
        const confirmDelete = confirm("Realmente deseja exclir este usuários?");
        if (confirmDelete) {
          await UserService.deleteByRole(
            user.isAdmin ? "administrator" : "dentist",
            id,
            token
          ).catch(console.log);
          router.reload();
        }
      },
    },
  ];

  return useDataTable<User>({ columns, data, actions });
};
