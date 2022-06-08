import { dateTimeTupleToISO } from "@/helpers";
import { CompleteClient } from "@modules/clients";
import {
  Action,
  columnFormatters as as,
  useDataTable,
  Column,
} from "@modules/data";
import { Service } from "@modules/services";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { CgPen, CgTrash } from "react-icons/cg";
import { DateTimeTuple, Schedule } from "../schedule.slice";
import { deleteById } from "../services";

const asDateTime = as.dateTime("pt-BR");
const columns: Column<keyof Schedule>[] = [
  {
    acessor: "client",
    label: "Cliente",
    format: (client: CompleteClient) => client.name,
  },
  {
    acessor: "service",
    label: "Serviço",
    format: (service: Service) => service.name,
  },
  {
    acessor: "startTime",
    label: "Início",
    format: (date: DateTimeTuple) => {
      const formatted = DateTime.fromJSDate(
        new Date(dateTimeTupleToISO(date)),
        { zone: "utc" }
      )
        .setLocale("pt-BR")
        .toLocaleString(DateTime.DATETIME_SHORT);

      return formatted;
    },
  },
  {
    acessor: "endTime",
    label: "Fim",
    format: (date: DateTimeTuple) => {
      const formatted = DateTime.fromJSDate(
        new Date(dateTimeTupleToISO(date)),
        { zone: "utc" }
      )
        .setLocale("pt-BR")
        .toLocaleString(DateTime.DATETIME_SHORT);

      return formatted;
    },
  },
];

export const useSchedulesTable = (token: string, data: Schedule[]) => {
  const router = useRouter();
  const actions: Action<Schedule>[] = [
    {
      id: "update-schedule",
      icon: CgPen,
      text: "Atualizar agendamento",
      onClick(item) {
        router.push(`/schedules/update/${item.id}`);
      },
    },
    {
      id: "delete-schedule",
      icon: CgTrash,
      text: "Excluir agendamento",
      onClick: async (schedule) => {
        const confirmDelete = window.confirm("Realmente deseja excluir?");

        if (confirmDelete) {
          await deleteById(token, schedule.id);
          router.reload();
        }
      },
    },
  ];

  return useDataTable<Schedule>({ columns, data, actions });
};
