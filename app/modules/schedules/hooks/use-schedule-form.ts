import { formatTolocalDate } from "@/helpers";
import { useField, useSelectField, UseSelectFieldProps } from "@modules/forms";
import { DateTimeString } from "../schedule.slice";

type UseScheduleFormProps = {
  client: UseSelectFieldProps;
  service: UseSelectFieldProps;
  startTime?: DateTimeString;
  endTime?: DateTimeString;
};

export const useScheduleForm = (props: UseScheduleFormProps) => {
  const { client, service, endTime = "", startTime = "" } = props;

  const clientField = useSelectField(client);
  const serviceField = useSelectField(service);
  const startTimeField = useField(startTime);
  const endTimeField = useField(endTime);

  return {
    client: clientField,
    service: serviceField,
    startTime: {
      ...startTimeField,
      onChange(value: string) {
        startTimeField.onChange(formatTolocalDate(value));
      },
    },
    endTime: {
      ...endTimeField,
      onChange(value: string) {
        endTimeField.onChange(formatTolocalDate(value));
      },
    },
  };
};
