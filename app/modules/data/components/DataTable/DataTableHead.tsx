import React from "react";
import { Column } from "@modules/data/types";

export interface DataTableHeadProps<T extends {}> {
  columns: Column<keyof T>[];
}

const DataTableHead = <T extends {}>({ columns }: DataTableHeadProps<T>) => {
  return (
    <thead>
      <tr>
        {columns.length > 0 &&
          columns.map((column) => {
            const key = column.acessor.toString();
            return <th key={key}>{column.label}</th>;
          })}
        <th>Ações</th>
      </tr>
    </thead>
  );
};

export default DataTableHead;
