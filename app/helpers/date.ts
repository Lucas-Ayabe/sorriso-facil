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

export const dateTimeTupleToISO = ([
  year,
  month,
  day,
  hour,
  minute,
]: DateTimeTuple) => {
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}Z`;
};
