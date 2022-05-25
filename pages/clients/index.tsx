import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { withDentistRoute, AuthenticatedPageProps } from "@modules/auth";
import {
  useClientsTable,
  findAll,
  Client,
  CompleteClient,
} from "@modules/clients";

export const getServerSideProps = withDentistRoute(async (ctx) => {
  return {
    props: {
      user: ctx.req.session.user,
      clients: await findAll(ctx.req.session.user?.token ?? ""),
    },
  };
});

type ClientsProps = AuthenticatedPageProps & {
  clients: Client[];
};

const Clients = ({ user, clients }: ClientsProps) => {
  const table = useClientsTable(user.token, clients as CompleteClient[]);

  return (
    <>
      <ListPage
        title={{
          singular: "cliente",
          plural: "clientes",
        }}
        resource="clients"
        table={table}
      />
      <br />
      <br />
      <dialog className="card flow">
        <div>
          <h3>Foo</h3>
          <p>20 anos</p>
        </div>
        <address>
          Cabo Frio - Doze, Bela Vista, Subsolo 2, 6757, RJ, 28876-519
        </address>

        <h4>Telefones</h4>
        <ul style={{ listStylePosition: "inside" }}>
          <li>(99) 9999-9999</li>
          <li>(99) 9999-9999</li>
          <li>(99) 9999-9999</li>
          <li>(99) 9999-9999</li>
          <li>(99) 9999-9999</li>
          <li>(99) 9999-9999</li>
        </ul>
      </dialog>
    </>
  );
};

Clients.getLayout = (page: ReactElement, { user }: ClientsProps) => {
  return <Dashboard isAdmin={user.admin}>{page}</Dashboard>;
};

export default Clients;
