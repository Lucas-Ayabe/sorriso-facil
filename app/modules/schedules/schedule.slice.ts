import { CompleteClient } from "@modules/clients";
import { Dentist } from "@modules/dentist";
import { Service } from "@modules/services";

export type DateTimeString = string;

export interface Schedule {
  id: number;
  service: Service;
  dentist: Omit<Dentist, "schedules" | "services" | "clients">;
  client: CompleteClient;
  startTime: DateTimeString;
  endTime: DateTimeString;
}
