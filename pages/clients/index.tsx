import { ReactElement } from "react";

import { Dashboard, ListPage } from "@modules/ui";
import { withDentistRoute, AuthenticatedPageProps } from "@modules/auth";
import {
  useClientsTable,
  findAll,
  Client,
  CompleteClient,
} from "@modules/clients";
import { useAppSelector } from "@hooks";

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
  const { client } = useAppSelector((state) => state.client.modal);
  const [table, dialogRef] = useClientsTable(
    user.token,
    clients as CompleteClient[]
  );
  console.log(clients);

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
      <dialog ref={dialogRef} className="card flow">
        <div>
          <h3>{client.name}</h3>
          <p>{client.age} anos</p>
        </div>

        <h4>Endereço</h4>
        {client.contacts ? (
          <address>
            {client.contacts?.address?.street},{" "}
            {client.contacts?.address?.neighborhood},{" "}
            {client.contacts?.address?.number}, {client.contacts?.address?.city}
            , {client.contacts?.address?.state}, {client.contacts?.address?.cep}
          </address>
        ) : (
          "Ainda sem endereço cadastrado"
        )}

        <div>
          <h4>Telefones</h4>

          {client.contacts ? (
            <ul style={{ listStylePosition: "inside" }}>
              {client.contacts?.telephones.map((telephone) => (
                <li key={telephone.id}>
                  ({telephone.ddd}) {telephone.number}
                </li>
              ))}
            </ul>
          ) : (
            "Ainda sem telefones cadastrados"
          )}
        </div>

        <button
          className="button--small"
          onClick={() => dialogRef.current.close()}
        >
          Fechar
        </button>
      </dialog>
    </>
  );
};

Clients.getLayout = (page: ReactElement, { user }: ClientsProps) => {
  return <Dashboard isAdmin={user.admin}>{page}</Dashboard>;
};

export default Clients;
