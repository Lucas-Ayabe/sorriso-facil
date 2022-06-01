import { AddressDto, addressRepository } from "@modules/address";
import { CrudService } from "@modules/http";
import { telephoneRepository, Telephone } from "@modules/telephones";
import { MaybeAsync } from "purify-ts";
import { Client, CompleteClient } from "../client.slice";

export type ClientDto = Omit<Client, "id">;
export type CompleteClientDto = Omit<Client, "id"> & {
  address: AddressDto;
  telephones: Omit<Telephone, "id">[];
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
  return clientRepository(token).findAll() as unknown as CompleteClient[];
};

export const create = async (token: string, client: CompleteClientDto) => {
  try {
    const createdClient = await clientRepository(token).create(client);
    const createdClientId = createdClient.mapOrDefault(({ id }) => id, 0);
    if (createdClientId !== 0) {
      await addressRepository(token, createdClientId).create(client.address);
      await Promise.all(
        client.telephones.map((dto) =>
          telephoneRepository(token, createdClientId).create(dto)
        )
      );

      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const findById = async (token: string, id: number) => {
  return clientRepository(token).findById(id) as MaybeAsync<CompleteClient>;
};

export const updateById = async (
  token: string,
  id: number,
  client: CompleteClient
) => {
  return Promise.all([
    clientRepository(token).update(id, client),
    addressRepository(token, id).update(
      client.contacts?.address.id ?? 0,
      client.contacts?.address ?? {
        id: 0,
        cep: "00000-0000",
        city: "",
        country: "",
        neighborhood: "",
        number: 0,
        state: "",
        street: "",
      }
    ),
    ...(client.contacts?.telephones ?? []).map(
      ({ id: telephoneId, ...dto }) => {
        return telephoneRepository(token, id).update(telephoneId, dto);
      }
    ),
  ]).then((results) => results.every((result) => result));
};

export const deleteById = async (token: string, id: number) => {
  return clientRepository(token).delete(id);
};
