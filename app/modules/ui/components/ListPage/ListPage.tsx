import React from "react";
import Head from "next/head";

import _ from "lodash";

import { DataTable, DataTableProps } from "@modules/data";
import { ListPageHeader } from "./ListPageHeader";

export interface ListPageProps<T> {
  resource: string;
  title: {
    singular: string;
    plural: string;
  };
  table: DataTableProps<T>;
}

export const ListPage = <T extends {}>(props: ListPageProps<T>) => {
  const { title, table } = props;

  return (
    <>
      <Head>
        <title>Listar {_.capitalize(title.plural)}</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flow">
        <ListPageHeader {...props} />
        <div />

        <DataTable {...table} />
      </div>
    </>
  );
};
