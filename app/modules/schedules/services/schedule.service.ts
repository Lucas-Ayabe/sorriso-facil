import _ from "lodash";
import { MaybeAsync } from "purify-ts";
import { CrudService } from "@modules/http";
import { DateTimeString, Schedule } from "../schedule.slice";

export type CreateScheduleDto = {
  clientId: number;
  serviceId: number;
  startTime: DateTimeString;
  endTime: DateTimeString;
};

export type UpdateScheduleDto = Pick<
  CreateScheduleDto,
  "startTime" | "endTime"
>;

type ScheduleDto = CreateScheduleDto | UpdateScheduleDto;

const scheduleRepository = (token: string) => {
  return new CrudService<Schedule, ScheduleDto>({
    token,
    resource: {
      singular: "schedule",
      plural: "schedules",
    },
  });
};

export const findAll = async (token: string): Promise<Schedule[]> => {
  // return scheduleRepository(token).findAll();
  return [
    {
      id: 1,
      client: {
        id: 1,
        name: "Foo",
        age: 34,
      },
      dentist: {
        id: 1,
        name: "Jane Doe",
        email: "jane.doe@example.com",
      },
      service: {
        id: 1,
        name: "Limpeza",
        price: 220,
      },
      startTime: "2022-06-30T13:47",
      endTime: "2022-06-30T14:02",
    },
  ];
};

export const findById = (token: string, id: number) => {
  return MaybeAsync(async () => {
    const schedules = await scheduleRepository(token).findAll();
    return schedules.find((schedule) => schedule.id === id);
  });
};

export const create = async (token: string, schedule: CreateScheduleDto) => {
  const { clientId, serviceId } = schedule;
  return scheduleRepository(token).create(
    _.pick(schedule, ["startTime", "endTime"]),
    `/schedule/client/${clientId}/service/${serviceId}`
  );
};

export const updateById = async (
  token: string,
  id: number,
  schedule: UpdateScheduleDto
) => {
  return scheduleRepository(token).update(id, schedule);
};

export const deleteById = async (token: string, id: number) => {
  return scheduleRepository(token).delete(id);
};
