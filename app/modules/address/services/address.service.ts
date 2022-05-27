import { Address } from "@modules/clients";
import { ChildCrudService } from "@modules/http";

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
