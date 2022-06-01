import _ from "lodash";
import { get } from "lodash/fp";

export const getFieldsData = <T extends object>(fields: T) => {
  return _.mapValues(fields, get("value"));
};
