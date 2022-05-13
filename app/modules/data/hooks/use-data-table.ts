import { Action, DataTableProps } from "../components";
import { Column } from "../types";

export const useDataTable = <T extends {}>(
  columns: Column<keyof T>[],
  data: T[],
  actions: Action<T>[]
): DataTableProps<T> => {
  return {
    columns,
    data,
    actions,
    keyExtractor(_, index) {
      return index;
    },
  };
};
