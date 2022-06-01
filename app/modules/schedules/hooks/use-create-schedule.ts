import { UseSelectFieldProps } from "@modules/forms";
import { useScheduleForm } from "./use-schedule-form";
import { create } from "../services";
import { Maybe } from "purify-ts";
import { useRouter } from "next/router";

type UseCreateScheduleProps = {
  client: UseSelectFieldProps;
  service: UseSelectFieldProps;
};

const mapInputToEntityId = (input: { value?: string }) => {
  return Maybe.fromNullable(input.value).mapOrDefault(parseInt, 0);
};

export const useCreateSchedule = (
  token: string,
  props: UseCreateScheduleProps
) => {
  const router = useRouter();
  const { client, service, startTime, endTime } = useScheduleForm({
    ...props,
    startTime: "",
    endTime: "",
  });

  const onSubmit = async () => {
    console.log({
      clientId: mapInputToEntityId(client),
      serviceId: mapInputToEntityId(service),
      startTime: startTime.value,
      endTime: endTime.value,
    });

    // const createdSchedule = await create(token, {
    //   clientId: mapInputToEntityId(client),
    //   serviceId: mapInputToEntityId(service),
    //   startTime: startTime.value,
    //   endTime: endTime.value,
    // });

    // createdSchedule.caseOf({
    //   Just: () => router.push("/schedules"),
    //   Nothing: async () => {
    //     window.alert("Não foi possível agendar");
    //     return false;
    //   },
    // });
  };

  return {
    client,
    service,
    startTime,
    endTime,
    onSubmit,
  };
};
