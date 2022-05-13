import _ from "lodash";

export const columnFormatters = {
  string: (item: unknown): string => {
    if (_.isNil(item)) return "";
    if (_.isString(item)) return item;
    return (item as object).toString();
  },
  number: (item: unknown): string => {
    const number = _.isNumber(item) ? item : 0;
    return number.toString();
  },
  boolean: (item: unknown): string => {
    return _.isBoolean(item) ? JSON.stringify(item) : "";
  },
  date: (locale: string) => {
    return (item: unknown): string => {
      return _.isDate(item) ? item.toLocaleDateString(locale) : "";
    };
  },
  jsonDate: (item: unknown): string => {
    return _.isDate(item) ? item.toJSON() : "";
  },
};
