export const formatTolocalDate = (value: string) => {
  const offset = new Date().getTimezoneOffset() * 1000 * 60;
  const offsetDate = new Date(value).valueOf() - offset;
  const date = new Date(offsetDate).toISOString();
  return date.substring(0, 16);
};
