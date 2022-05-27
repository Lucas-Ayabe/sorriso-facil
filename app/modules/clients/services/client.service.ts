import { AddressDto, addressRepository } from "@modules/address";
import { CrudService } from "@modules/http";
import { Client, CompleteClient } from "../client.slice";

export type ClientDto = Omit<Client, "id">;
export type CompleteClientDto = Omit<Client, "id"> & {
  address: AddressDto;
};

export const clientRepository = (token: string) => {
  return new CrudService<Client, ClientDto>({
    token,
    resource: {
      plural: "clients",
      singular: "client",
    },
  });
};

export const findAll = async (token: string): Promise<CompleteClient[]> => {
  // return clientRepository(token).findAll();
  return [
    {
      id: 1,
      name: "Foo",
      age: 20,
      address: {
        id: 1,
        cep: "00000-0000",
        city: "cidade",
        country: "Brasil",
        neighborhood: "bairro",
        number: 1,
        state: "São Paulo",
        street: "rua",
      },
      telephones: [
        { id: 1, ddd: 11, number: "00000-0000" },
        { id: 2, ddd: 11, number: "00000-0000" },
        { id: 3, ddd: 11, number: "00000-0000" },
      ],
    },
    {
      id: 2,
      name: "Bar",
      age: 22,
      address: {
        id: 2,
        cep: "00000-0000",
        city: "cidade",
        country: "Brasil",
        neighborhood: "bairro",
        number: 2,
        state: "São Paulo",
        street: "rua",
      },
      telephones: [{ id: 2, ddd: 12, number: "11111-1111" }],
    },
  ];
};

export const create = async (token: string, client: CompleteClientDto) => {
  (await clientRepository(token).create(client)).ifJust((createdClient) => {
    addressRepository(token, createdClient.id).create(client.address);
  });
};

export const deleteById = async (token: string, id: number) => {
  return clientRepository(token).delete(id);
};
