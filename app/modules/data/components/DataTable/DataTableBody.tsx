import React from "react";
import { Dropdown } from "@modules/ui/components";
import { DataTableProps } from "./DataTable";

export const DataTableBody = <T extends {}>({
  data,
  keyExtractor,
  columns,
  actions,
}: DataTableProps<T>) => {
  return (
    <tbody>
      {data.length > 0 &&
        data.map((row, index) => {
          const key = keyExtractor(row, index);
          return (
            <tr key={key}>
              {columns.map((column) => {
                return (
                  <td key={column.acessor.toString() + key}>
                    {column.format(row[column.acessor])}
                  </td>
                );
              })}

              <td>
                <Dropdown
                  position={{ right: 0, top: "calc(100% + 0.5em)" }}
                  options={actions.map((action) => {
                    return {
                      ...action,
                      onClick: () => {
                        if (action.onClick) {
                          action.onClick(row);
                        }
                      },
                    };
                  })}
                />
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};
