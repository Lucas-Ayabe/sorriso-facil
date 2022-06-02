import { CompleteClient } from "@modules/clients";
import { Dentist } from "@modules/dentist";
import { Service } from "@modules/services";

type year = number;
type month = number;
type day = number;
type hour = number;
type minute = number;

export type DateTimeString = string;
export type DateTimeTuple = [year, month, day, hour, minute];

export interface Schedule {
  id: number;
  service: Service;
  dentist: Omit<Dentist, "schedules" | "services" | "clients">;
  client: CompleteClient;
  startTime: DateTimeTuple;
  endTime: DateTimeTuple;
}
