import { CgBriefcase, CgCalendar, CgUser } from "react-icons/cg";

export const dentistRoutes = [
  {
    route: "/",
    text: "Agenda",
    icon: CgCalendar,
  },
  {
    route: "/",
    text: "Serviços",
    icon: CgBriefcase,
  },
  {
    route: "/",
    text: "Clientes",
    icon: CgUser,
  },
] as const;
