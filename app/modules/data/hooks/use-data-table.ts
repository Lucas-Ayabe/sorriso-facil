import { Action, DataTableProps } from "../components";
import { Column } from "../types";

export const useDataTable = <T extends { id: number }>(baseProps: {
  columns: Column<keyof T>[];
  data: T[];
  actions: Action<T>[];
}): DataTableProps<T> => {
  return {
    ...baseProps,
    keyExtractor(column) {
      return column.id;
    },
  };
};
