import { ChildCrudService } from "@modules/http";

export interface Address {
  id: number;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  cep: string;
}

export type AddressDto = Omit<Address, "id">;

export const addressRepository = (token: string, parentId: number) => {
  return new ChildCrudService<Address, AddressDto>({
    token,
    resource: {
      singular: "address",
      plural: "addresses",
    },
    parentResource: {
      id: parentId,
      singular: "client",
      plural: "clients",
    },
  });
};
