import { CrudService } from "@modules/http";
import { Client } from "../client.slice";

export type ClientDto = Omit<Client, "id" | "contacts">;

const clientRepository = (token: string) => {
  return new CrudService<Client, ClientDto>({
    token,
    resource: {
      plural: "clients",
      singular: "client",
    },
  });
};

export const findAll = async (token: string): Promise<Client[]> => {
  // return clientRepository(token).findAll();
  return [
    { id: 1, name: "Foo", age: 20 },
    { id: 2, name: "Bar", age: 31 },
    { id: 3, name: "Bazz", age: 15 },
    { id: 4, name: "Fulano", age: 23 },
    { id: 5, name: "Beltrano", age: 17 },
  ];
};

export const create = async (token: string, client: ClientDto) => {
  return clientRepository(token).create(client);
};
