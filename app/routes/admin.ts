import { CgUserAdd, CgUserList } from "react-icons/cg";

export const adminRoutes = [
  {
    route: "/users",
    text: "Usuários",
    icon: CgUserList,
  },
  {
    route: "/users/create",
    text: "Criar Usuário",
    icon: CgUserAdd,
  },
] as const;
