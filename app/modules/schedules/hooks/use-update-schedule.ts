import { useScheduleForm } from "./use-schedule-form";
import { updateById } from "../services";
import { useRouter } from "next/router";
import { DateTimeString } from "../schedule.slice";

type UseUpdateScheduleProps = {
  startTime: DateTimeString;
  endTime: DateTimeString;
};

export const useUpdateSchedule = (
  token: string,
  id: number,
  props: UseUpdateScheduleProps
) => {
  const router = useRouter();
  const { startTime, endTime } = useScheduleForm({
    ...props,
    client: { options: [] },
    service: { options: [] },
  });

  const onSubmit = async () => {
    const isUpdated = await updateById(token, id, {
      startTime: startTime.value,
      endTime: endTime.value,
    });

    if (isUpdated) {
      router.push("/schedules");
    } else {
      window.alert("Erro ao atualizar!");
    }
  };

  return {
    startTime,
    endTime,
    onSubmit,
  };
};
