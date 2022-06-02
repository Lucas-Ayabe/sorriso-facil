import { DateTimeTuple } from "@modules/schedules";

export const formatTolocalDate = (value: string | DateTimeTuple) => {
  const offset = new Date().getTimezoneOffset() * 1000 * 60;
  const offsetDate =
    typeof value === "string"
      ? new Date(value).valueOf() - offset
      : new Date(...value).valueOf() - offset;
  const date = new Date(offsetDate).toISOString();
  return date.substring(0, 16);
};
