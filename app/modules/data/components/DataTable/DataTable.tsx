import React, { Key } from "react";

import { DropdownOption } from "@modules/ui/components";

import { Column } from "@modules/data/types";
import DataTableHead from "./DataTableHead";
import { DataTableBody } from "./DataTableBody";
import { useElementSize } from "usehooks-ts";

export type Action<T> = Omit<DropdownOption, "onClick"> & {
  onClick?: (item: T) => void;
};

export interface DataTableProps<T extends {}> {
  columns: Column<keyof T>[];
  data: T[];
  actions: Action<T>[];
  keyExtractor: (item: T, index: string | number) => Key;
}

const actionHeight = 39;
const dropdownPadding = 16;
const shadowOffset = 32;

export const DataTable = <T extends {}>(props: DataTableProps<T>) => {
  const { columns, actions } = props;
  const [tableRef, { height: tableHeight }] = useElementSize();
  const actionsHeight = actionHeight * actions.length;

  const dynamicHeight = {
    height: tableHeight + actionsHeight + dropdownPadding + shadowOffset,
  };

  return (
    <figure className="table--wrappper" style={dynamicHeight}>
      <table ref={tableRef}>
        <DataTableHead columns={columns} />
        <DataTableBody {...props} />
      </table>
    </figure>
  );
};
