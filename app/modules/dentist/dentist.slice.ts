import { CompleteClient } from "@modules/clients";
import { Schedule } from "@modules/schedules";
import { Service } from "@modules/services";

type Client = CompleteClient & { schedules: Schedule[] };

export interface Dentist {
  id: number;
  name: string;
  email: string;
  clients: Client[];
  schedules: Schedule[];
  services: Service[];
}
