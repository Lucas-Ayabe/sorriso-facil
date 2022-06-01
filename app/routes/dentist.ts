import { CgBriefcase, CgCalendar, CgUser } from "react-icons/cg";

export const dentistRoutes = [
  {
    route: "/schedules",
    text: "Agenda",
    icon: CgCalendar,
  },
  {
    route: "/services",
    text: "Serviços",
    icon: CgBriefcase,
  },
  {
    route: "/clients",
    text: "Clientes",
    icon: CgUser,
  },
] as const;
